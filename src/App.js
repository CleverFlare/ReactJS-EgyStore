import NavBar from "./components/NavBar";
import "./css/base.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SignIn from "./pages/Singin";
import { useEffect } from "react";
import { connect } from "react-redux";

function App({ lang }) {
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
      <div className={"App" + ` ${lang === "ar" && "arabic"}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(App);
