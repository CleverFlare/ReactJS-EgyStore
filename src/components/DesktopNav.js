import { useState, useEffect } from "react";
import "./components css/desktopNav.css";
import Container from "./Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DesktopNav = ({ token, lang }) => {
  const langWords = {
    specialOffers: lang === "en" ? "Special Offers" : "عروض خاصة",
    brands: lang === "en" ? "Brands" : "علامات تجارية",
    sell: lang === "en" ? "Sell On EgyStore" : "بع على إجي ستور",
    contact: lang === "en" ? "Contact" : "اتصل بنا",
    login: lang === "en" ? "Login" : "تسجيل الدخول",
  };

  return (
    <Container>
      <div className="desktop-nav">
        <div className="desktop-nav__left-side">
          <Link to="/" className="first-button-style" id="home">
            <span className="icon-home"></span>
          </Link>
          <Link to="" id="special-offers">
            {langWords.specialOffers}
          </Link>
          <Link to="" id="brands">
            {langWords.brands}
          </Link>
          <Link to="" id="sell-on-egystore">
            {langWords.sell}
          </Link>
          <Link to="" id="contact">
            {langWords.contact}
          </Link>
        </div>
        <div className="desktop-nav__right-side">
          {token ? (
            <Link to="" id="avatar"></Link>
          ) : (
            <Link to="/login" className="first-button-style" id="login">
              {langWords.login}
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(DesktopNav);
