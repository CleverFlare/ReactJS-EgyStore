import TopNav from "../components/TopNav";
import PhoneNav from "../components/PhoneNav";
import "./pages css/login.css";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAuth,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const auth = getAuth();
setPersistence(auth, browserLocalPersistence);

const db = getFirestore();

const Sign = ({ lang, setToken, setCred }) => {
  const { form } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/default%20avatar.png?alt=media&token=9d150bd6-79e3-452c-8512-fca0ccc39f5f",
          }).then(() => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            setDoc(docRef, {
              username,
              email,
              password,
              photo:
                "https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/default%20avatar.png?alt=media&token=9d150bd6-79e3-452c-8512-fca0ccc39f5f",
            });
            setToken(cred.user.uid);
            setCred(cred.user);
            navigate("/");
          });
        })
        .catch((err) => {
          alert(err);
        });
    } else if (form === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log(cred.user.photoURL);
          setToken(cred.user.uid);
          setCred(cred.user);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <>
      <PhoneNav />
      <TopNav />
      <div className="login-page">
        <div className="login-page__image-wrapper">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/wallpaperflare.com_wallpaper.jpg?alt=media&token=435db439-2ffa-4704-a5fd-d3183aedc35a"
            alt=""
            className="login-page__left-image"
          />
        </div>
        <form className="login-page__form" onSubmit={handleSubmit}>
          <Link to="/" className="login-page__go-back">
            &lt; {lang === "en" ? "Home" : "الرئيسية"}
          </Link>
          {form === "login" && (
            <h2 className="login-page__form-title">
              {lang === "en" ? "Login" : "تسجيل الدخول"}
            </h2>
          )}
          {form === "signup" && (
            <h2 className="login-page__form-title">
              {lang === "en" ? "Signup" : "إنشاء حساب"}
            </h2>
          )}
          {form === "signup" && (
            <div className="login-page__input-wrapper">
              <label>{lang === "en" ? "username" : "اسم المستخدم"}</label>
              <input
                type="text"
                placeholder={lang === "en" ? "type here..." : "أكتب هنا..."}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
          )}
          <div className="login-page__input-wrapper">
            <label>{lang === "en" ? "email" : "الحساب"}</label>
            <input
              type="email"
              placeholder={lang === "en" ? "type here..." : "أكتب هنا..."}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </div>
          <div className="login-page__input-wrapper">
            <label>{lang === "en" ? "password" : "كلمة السر"}</label>
            <input
              type="password"
              placeholder={lang === "en" ? "type here..." : "أكتب هنا..."}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>
          {form === "signup" && <div id="reCaptcha"></div>}
          {form === "login" && (
            <button className="login-page__submit-button">
              {lang === "en" ? "Login" : "تسجيل"}
            </button>
          )}
          {form === "signup" && (
            <button className="login-page__submit-button">
              {lang === "en" ? "Signup" : "تسجيل"}
            </button>
          )}
          {form === "login" && (
            <Link
              className="login-page__signup-redirector"
              to="/account/signup"
            >
              {lang === "en" ? "create account" : "إنشاء حساب"}
            </Link>
          )}
          {form === "signup" && (
            <Link className="login-page__signup-redirector" to="/account/login">
              {lang === "en" ? "Have Account" : "لدي حساب"}
            </Link>
          )}
        </form>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setToken: (value) => {
      dispatch({ type: "SET_TOKEN", payload: value });
    },
    setCred: (value) => {
      dispatch({ type: "SET_CRED", payload: value });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign);
