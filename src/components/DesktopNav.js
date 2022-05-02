import { useState, useEffect } from "react";
import "./components css/desktopNav.css";
import Container from "./Container";
import { connect } from "react-redux";

const arabicLang = {
  specialOffers: "عروض خاصة",
  brands: "علامات تجارية",
  sell: "بع على إجي ستور",
  contact: "اتصل بنا",
};

const DesktopNav = ({ lang }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Container>
      <div className={"desktop-nav" + ` ${lang === "ar" && "arabic"}`}>
        <div className="desktop-nav__left-side">
          <a href="" className="first-button-style" id="home">
            <span className="icon-home"></span>
          </a>
          <a href="" id="special-offers">
            {lang === "en" ? "Special Offers" : arabicLang.specialOffers}
          </a>
          <a href="" id="brands">
            {lang === "en" ? "Brands" : arabicLang.brands}
          </a>
          <a href="" id="sell-on-egystore">
            {lang === "en" ? "Sell On EgyStore" : arabicLang.sell}
          </a>
          <a href="" id="contact">
            {lang === "en" ? "Contact" : arabicLang.contact}
          </a>
        </div>
        <div className="desktop-nav__right-side">
          {isLoggedIn ? (
            <button className="first-button-style" id="login">
              Login
            </button>
          ) : (
            <a href="" id="avatar"></a>
          )}
        </div>
      </div>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(DesktopNav);
