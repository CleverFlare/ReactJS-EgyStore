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

const AccountDetails = ({ cred, signoutDispatch }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [pfp, setPfp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cred) return;
    const docRef = doc(db, "users", cred.uid);
    getDoc(docRef).then((snapshot) => {
      setUsername(snapshot.data().username);
      setPassword(snapshot.data().password);
      setEmail(snapshot.data().email);
      setPfp(snapshot.data().photo);
      setUserData(snapshot.data());
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
            &lt; Home
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
            <label htmlFor="">e-mail</label>
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
            <label htmlFor="">username</label>
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
            <label htmlFor="">password</label>
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
                done
              </button>
              <button
                className="account-details__edit-cancle-button"
                onClick={handleCancleEditing}
              >
                cancle
              </button>
            </div>
          )}
          {!editing && (
            <div className="account-details__button-group">
              <button
                className="account-details__edit-button"
                onClick={handleStartEditing}
              >
                edit your profile info
              </button>
              <button
                className="account-details__singout-button"
                onClick={handleSingout}
              >
                signout
              </button>
              <button
                className="account-details__delete-account-button"
                onClick={handleDeleteAccount}
              >
                delete account
              </button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    cred: state.cred,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signoutDispatch: () => dispatch({ type: "SIGNOUT" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
