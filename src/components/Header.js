import "./components css/header.css";
import Container from "./Container";
import { connect } from "react-redux";

const Header = ({ lang }) => {
  const langWords = {
    search: lang === "en" ? "Search..." : "بحث...",
    searchButton: lang === "en" ? "Search" : "بحث",
    cart: lang === "en" ? "Your Cart" : "عربة تسوقك",
  };
  return (
    <Container>
      <div className={"header-sec" + ` ${lang === "ar" && "arabic"}`}>
        <img className="header-sec__logo" src="./images/logo.png" alt="logo" />
        <div className="header-sec__searchbar-wrapper">
          <input
            type="search"
            placeholder={langWords.search}
            autoComplete="off"
          />
          <button className="search-button first-button-style">
            {langWords.searchButton}
          </button>
        </div>
        <button className="header-sec__cart-button second-button-style">
          <span className="icon-shopping-cart"></span>
          <p>{langWords.cart}</p>
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
