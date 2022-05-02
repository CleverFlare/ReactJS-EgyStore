import "./components css/header.css";
import Container from "./Container";
import { connect } from "react-redux";

const Header = ({ lang }) => {
  return (
    <Container>
      <div className={"header-sec" + ` ${lang === "ar" && "arabic"}`}>
        <img className="header-sec__logo" src="./images/logo.png" alt="logo" />
        <div className="header-sec__searchbar-wrapper">
          <input
            type="search"
            placeholder={lang === "en" ? "Search..." : "بحث..."}
            autoComplete="off"
          />
          <button className="search-button first-button-style">
            {lang === "en" ? "Search" : "بحث"}
          </button>
        </div>
        <button className="header-sec__cart-button second-button-style">
          <span className="icon-shopping-cart"></span>
          <p>{lang === "en" ? "Your Cart" : "عربة التسوقك"}</p>
        </button>
      </div>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(Header);
