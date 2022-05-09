import { React, useState } from "react";
import ReactDOM from "react-dom";
import "./components css/phoneNav.css";
import Container from "./Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const PhoneMenu = ({ token, lang, handleLang, handleToggle }) => {
  const langWords = {
    home: lang === "en" ? "Home" : "الرئيسية",
    specialOffers: lang === "en" ? "Special Offers" : "عروض مميزة",
    brands: lang === "en" ? "Brands" : "علامات تجارية",
    sell: lang === "en" ? "Sell On EgyStore" : "بع على إجي ستور",
    cart: lang === "en" ? "Your Cart" : "عربة تسوقك",
    login: lang === "en" ? "Login" : "تسجيل الدخول",
  };

  return (
    <div className="phone-nav__phone-menu">
      <div className="phone-menu__wrapper">
        {!token && (
          <select
            className="phone-menu__pick-lang excluded-fonts"
            id="pick-lang"
            value={lang}
            onChange={handleLang}
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        )}
        {token && (
          <Link to="/account" id="avatar" onClick={handleToggle}>
            <img src={auth.currentUser && auth.currentUser.photoURL} />
          </Link>
        )}
        <div className="phone-nav__anchor-list">
          <Link to="/" onClick={handleToggle}>
            <span className="icon-home"></span>
            <p>{langWords.home}</p>
          </Link>
          <Link to="" onClick={handleToggle}>
            <span className="icon-crown"></span>
            <p>{langWords.specialOffers}</p>
          </Link>
          <Link to="" onClick={handleToggle}>
            <span className="icon-shopping-bag"></span>
            <p>{langWords.brands}</p>
          </Link>
          <Link to="" onClick={handleToggle}>
            <span className="icon-thumbs-up"></span>
            <p>{langWords.sell}</p>
          </Link>
          <Link to="" onClick={handleToggle}>
            <span className="icon-shopping-cart"></span>
            <p>{langWords.cart}</p>
          </Link>
          {!token && (
            <Link to="/account/login" onClick={handleToggle}>
              <span className="icon-user"></span>
              <p>{langWords.login}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ lang }) => {
  return (
    <form className="phone-searchbar">
      <input
        type="search"
        placeholder={lang === "en" ? "search..." : "بحث..."}
      />
    </form>
  );
};

const PhoneNav = ({ token, lang, dispatch }) => {
  const handleMenuToggle = () => {
    document.getElementById("root").classList.toggle("moveForMenu");
  };
  const handleLangChange = (event) => {
    dispatch(event.target.value);
  };
  return (
    <div className="phone-nav">
      <Container>
        <div className="phone-nav__items-wrapper">
          <img
            className="phone-nav__logo"
            src="https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/phone%20logo.png?alt=media&token=fe508fc8-13c9-4369-b30e-20ec0b23aeb3"
          />
          <div className="phone-nav__buttons-wrapper">
            <button className="phone-nav__vital-button">
              <span className="icon-search"></span>
            </button>
            <button
              className="phone-nav__vital-button"
              onClick={handleMenuToggle}
            >
              <span className="icon-menu-burger"></span>
            </button>
          </div>
          {token && (
            <div className="phone-nav__site-config excluded-fonts">
              <select id="pick-currency">
                <option value="USD">USD</option>
                <option value="EGP">EGP</option>
                <option value="AED">AED</option>
                <option value="SAR">SAR</option>
              </select>
              <select id="pick-lang" value={lang} onChange={handleLangChange}>
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
              <select id="pick-country">
                <option value="Egypt">Egypt</option>
                <option value="United States">United States</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Emirats">Emirats</option>
              </select>
            </div>
          )}
        </div>
      </Container>
      {ReactDOM.createPortal(
        <PhoneMenu
          token={token}
          lang={lang}
          handleLang={handleLangChange}
          handleToggle={handleMenuToggle}
        />,
        document.body
      )}
    </div>
  );
};

function maptDispatchToProps(dispatch) {
  return {
    dispatch: (value) => {
      dispatch({ type: "CHANGE_LANG", payload: value });
    },
  };
}

function mapStateToProps(state) {
  return {
    token: state.token,
    lang: state.lang,
  };
}

export default connect(mapStateToProps, maptDispatchToProps)(PhoneNav);
