import "./components css/header.css";
import Container from "./Container";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ lang, search, searchDispatch }) => {
  const navigate = useNavigate();

  const langWords = {
    search: lang === "en" ? "Search..." : "بحث...",
    searchButton: lang === "en" ? "Search" : "بحث",
    cart: lang === "en" ? "Your Cart" : "عربة تسوقك",
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  const handleSearchValue = (event) => {
    searchDispatch(event.target.value);
  };

  return (
    <Container>
      <div className={"header-sec" + ` ${lang === "ar" && "arabic"}`}>
        <img
          className="header-sec__logo"
          src="https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/logo.png?alt=media&token=37c368e6-26cf-4633-8961-3747af01e3c3"
          alt="logo"
        />
        <form className="header-sec__searchbar-wrapper" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder={langWords.search}
            value={search}
            onChange={handleSearchValue}
            autoComplete="off"
            className="excluded-fonts"
          />
          <button className="search-button first-button-style">
            {langWords.searchButton}
          </button>
        </form>
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
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchDispatch: (value) => {
      dispatch({ type: "SEARCH_VALUE", payload: value });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
