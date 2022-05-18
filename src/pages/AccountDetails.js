import "./pages css/accountDetails.css";
import Container from "../components/Container";
import PhoneNav from "../components/PhoneNav";
import TopNav from "../components/TopNav";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  deleteField,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  deleteUser,
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const storage = getStorage();

const auth = getAuth();

const db = getFirestore();

const CartItem = ({
  id,
  user,
  name,
  path,
  picture,
  price,
  color,
  size,
  currency,
}) => {
  const [amount, setAmount] = useState(1);

  const handleIncreaseAmount = () => {
    if (amount < 1) return;
    setAmount(amount + 1);
  };

  const handleDecreaseAmount = () => {
    if (amount === 1) return;
    setAmount(amount - 1);
  };

  const handleRemoveItem = () => {
    const userRef = doc(db, "users", `${user}`);
    onSnapshot(userRef, (res) => {
      const user = res.data();
      delete user.cart[id];
      updateDoc(userRef, user);
    });
  };

  return (
    <div className="cart__item">
      <div className="cart__image-wrapper">
        <img className="cart__image" src={picture} />
      </div>
      <div className="cart__item-details">
        <Link to={path} className="cart__item-name">
          {name}
        </Link>
        {size && <p className="cart__item-size">size: {size}</p>}
      </div>
      <p className="cart__item-color">
        {color === "transparent" ? "default" : color}
      </p>
      <div className="cart__amount-wrapper">
        <p className="cart__amount">{amount}</p>
        <div className="cart__amount-buttons">
          <button
            className="cart__amount-increase"
            onClick={handleIncreaseAmount}
          >
            +
          </button>
          <button
            className="cart__amount-decrease"
            onClick={handleDecreaseAmount}
          >
            -
          </button>
        </div>
      </div>
      <p className="cart__item-price">
        {(price * currency.convertor).toFixed(2)} {currency.name}
      </p>
      <button className="cart__remove-button" onClick={handleRemoveItem}>
        ✖
      </button>
    </div>
  );
};

const AccountDetails = ({ cred, signoutDispatch, currency, lang }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [pfp, setPfp] = useState(null);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!cred) {
      return navigate("/account/login");
    }
    const docRef = doc(db, "users", cred.uid);
    onSnapshot(docRef, (snapshot) => {
      setUsername(snapshot.data().username);
      setPassword(snapshot.data().password);
      setEmail(snapshot.data().email);
      setPfp(snapshot.data().photo);
      setUserData(snapshot.data());
      if (Object.keys(snapshot.data().cart).length !== 0) {
        setCart(snapshot.data().cart);
      } else {
        setCart(null);
      }
    });
  }, [cred]);

  const handleStartEditing = (event) => {
    setEditing(!editing);
  };

  const handleUploadPfp = (event) => {
    const storageRef = ref(storage, "users/" + `${cred.uid}.png`);
    uploadBytes(storageRef, event.target.files[0])
      .then((snapshot) => {
        setPfp(auth.currentUser.photoURL);
      })
      .catch((err) => {
        alert(err);
      })
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          const docRef = doc(db, "users", cred.uid);
          updateProfile(auth.currentUser, {
            photoURL: url,
          }).then(() => {
            updateDoc(docRef, {
              photo: url,
            });
          });
        });
      });
  };

  const handleSingout = () => {
    signOut(auth)
      .then(() => {
        signoutDispatch();
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCancleEditing = () => {
    setEditing(false);
    setEmail(userData.email);
    setUsername(userData.username);
    setPassword(userData.password);
  };

  const handleSubmitEdit = () => {
    const docRef = doc(db, "users", cred.uid);
    if (email !== userData.email) {
      updateEmail(auth.currentUser, email).then(() => {
        updateDoc(docRef, {
          email,
        }).catch((err) => {
          alert(err);
        });
      });
    }
    if (password !== userData.password) {
      updatePassword(auth.currentUser, password).then(() => {
        updateDoc(docRef, {
          password,
        }).catch((err) => {
          alert("failed");
        });
      });
    }
    if (username !== userData.username) {
      updateProfile(auth.currentUser, {
        displayName: username,
      }).then(() => {
        updateDoc(docRef, {
          username,
        }).catch((err) => {
          alert("failed");
        });
      });
    }
    setEditing(false);
  };

  const handleDeleteAccount = () => {
    const docRef = doc(db, "users", cred.uid);
    const storageRef = ref(storage, "users/" + `${cred.uid}.png`);
    deleteDoc(docRef)
      .then(() => {
        deleteUser(auth.currentUser)
          .then(() => {
            signoutDispatch();
            navigate("/");
          })
          .catch((err) => {
            alert(err);
          });
      })
      .then(() => {
        deleteObject(storageRef);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <PhoneNav />
      <TopNav />
      <Container>
        <div className="account-details">
          <Link className="account-details__home" to="/">
            &lt; {lang === "en" ? "Home" : "الرئيسية"}
          </Link>
          <label
            htmlFor="account-details__file-input"
            className="account-details__pseudo-file-input"
          >
            <img src={pfp && pfp} alt="" />
          </label>
          <input
            id="account-details__file-input"
            type="file"
            onChange={handleUploadPfp}
          />
          <div className="account-details__input-wrapper">
            <label htmlFor="">{lang === "en" ? "e-mail" : "الإيميل"}</label>
            <input
              className="account-details__email-input"
              type="email"
              value={email ? email : ""}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              disabled={!editing}
            />
          </div>
          <div className="account-details__input-wrapper">
            <label htmlFor="">
              {lang === "en" ? "username" : "اسم المستخدم"}
            </label>
            <input
              className="account-details__username-input"
              type="text"
              value={username ? username : ""}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              disabled={!editing}
            />
          </div>
          <div className="account-details__input-wrapper">
            <label htmlFor="">
              {lang === "en" ? "password" : "كلمة المرور"}
            </label>
            <input
              type={!editing ? "password" : "text"}
              className="account-details__password-input"
              value={password ? password : ""}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              disabled={!editing}
            />
          </div>
          {editing && (
            <div className="account-details__button-group">
              <button
                className="account-details__edit-button"
                onClick={handleSubmitEdit}
              >
                {lang === "en" ? "done" : "تم"}
              </button>
              <button
                className="account-details__edit-cancle-button"
                onClick={handleCancleEditing}
              >
                {lang === "en" ? "cancle" : "إلغاء"}
              </button>
            </div>
          )}
          {!editing && (
            <div className="account-details__button-group">
              <button
                className="account-details__edit-button"
                onClick={handleStartEditing}
              >
                {lang === "en" ? "edit" : "تعديل"}
              </button>
              <button
                className="account-details__singout-button"
                onClick={handleSingout}
              >
                {lang === "en" ? "signout" : "تسجيل خروج"}
              </button>
              <button
                className="account-details__delete-account-button"
                onClick={handleDeleteAccount}
              >
                {lang === "en" ? "delete account" : "حذف الحساب"}
              </button>
            </div>
          )}
        </div>
        <div className="cart" id="cart">
          {lang === "en" ? <h2>Your cart</h2> : <h2>عربة تسوقك</h2>}
          {cart &&
            Object.keys(cart).map((item) => {
              const product = cart[item];
              return (
                <CartItem
                  key={item}
                  id={item}
                  name={product.name}
                  picture={product.image}
                  currency={currency}
                  color={product.color}
                  price={product.price}
                  path={product.path}
                  size={product.size}
                  user={cred.uid}
                />
              );
            })}
          {!cart &&
            (lang === "en" ? <p>No Products</p> : <p>لا توجد منتجات</p>)}
        </div>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    cred: state.cred,
    currency: state.currency,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signoutDispatch: () => dispatch({ type: "SIGNOUT" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
