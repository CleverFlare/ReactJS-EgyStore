import "./css/base.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Sign from "./pages/Sing";
import { useEffect } from "react";
import { connect } from "react-redux";
import SearchPage from "./pages/Search";
import DashBoard from "./dashboard/Dashboard";
import CategoryPage from "./pages/Category";
import ProductDetailsPage from "./pages/ProductDetails";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AccountDetails from "./pages/AccountDetails";

const auth = getAuth();

function App({ lang, setCred }) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCred(user);
    }
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    if (lang === "ar") {
      document.body.classList.add("arabic");
    } else {
      document.body.classList.remove("arabic");
    }
  }, [lang]);
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route
            path="/:category/:productID"
            element={<ProductDetailsPage />}
          />
          {/* <Route path="/dashboard" element={<DashBoard />} /> */}
          <Route path="/account/:form" element={<Sign />} />
          <Route path="/account" element={<AccountDetails />} />
        </Routes>
      </>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    lang: state.lang,
    cred: state.cred,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCred: (value) => {
      dispatch({ type: "SET_CRED", payload: value });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
