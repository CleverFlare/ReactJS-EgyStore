import { React, useState } from "react";
import ReactDOM from "react-dom";
import "./components css/phoneNav.css";
import Container from "./Container";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
          <Link to="/specialoffers" onClick={handleToggle}>
            <span className="icon-crown"></span>
            <p>{langWords.specialOffers}</p>
          </Link>
          <Link to="/brands" onClick={handleToggle}>
            <span className="icon-shopping-bag"></span>
            <p>{langWords.brands}</p>
          </Link>
          <Link to="" onClick={handleToggle}>
            <span className="icon-thumbs-up"></span>
            <p>{langWords.sell}</p>
          </Link>
          <Link to="/account" onClick={handleToggle}>
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

const SearchBar = ({ lang, isShowen, searchDispatch, setShowSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchValue) return;
    await searchDispatch(searchValue);
    setShowSearch(false);

    await setSearchValue("");

    await navigate("/search");
  };

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <form
      className={`phone-searchbar ${isShowen ? "show" : ""}`}
      onSubmit={handleSearch}
    >
      <input
        type="search"
        placeholder={lang === "en" ? "search..." : "بحث..."}
        value={searchValue}
        onChange={handleSearchValue}
      />
      <button className="second-button-style">
        {lang === "en" ? "Search" : "بحث"}
      </button>
    </form>
  );
};

const PhoneNav = ({
  token,
  currency,
  lang,
  dispatch,
  dispatchCurrency,
  searchDispatch,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const handleMenuToggle = () => {
    document.getElementById("root").classList.toggle("moveForMenu");
  };
  const handleLangChange = (event) => {
    dispatch(event.target.value);
  };
  const handleCurrency = (event) => {
    let convertorValue = 1;
    switch (event.target.value) {
      case "USD":
        convertorValue = 1;
        break;
      case "EGP":
        convertorValue = 18.31;
        break;
      case "AED":
        convertorValue = 3.67;
        break;
      case "SAR":
        convertorValue = 3.75;
        break;
      default:
        convertorValue = 1;
    }
    dispatchCurrency({ name: event.target.value, convertor: convertorValue });
    localStorage.setItem(
      "currency",
      JSON.stringify({
        name: event.target.value,
        convertor: convertorValue,
      })
    );
  };

  const handleSearchBarToggle = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="phone-nav">
      <SearchBar
        lang={lang}
        isShowen={showSearch}
        searchDispatch={searchDispatch}
        setShowSearch={setShowSearch}
      />
      <Container>
        <div className="phone-nav__items-wrapper">
          <img
            className="phone-nav__logo"
            src="https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/phone%20logo.png?alt=media&token=fe508fc8-13c9-4369-b30e-20ec0b23aeb3"
          />
          <div className="phone-nav__buttons-wrapper">
            <button
              className="phone-nav__vital-button"
              onClick={handleSearchBarToggle}
            >
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
              <select
                id="pick-currency"
                value={currency.name}
                onChange={handleCurrency}
              >
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
    dispatchCurrency: (value) => {
      dispatch({ type: "CHANGE_CURRENCY", payload: value });
    },
    searchDispatch: (value) => {
      dispatch({ type: "SEARCH_VALUE", payload: value });
    },
  };
}

function mapStateToProps(state) {
  return {
    token: state.token,
    lang: state.lang,
    currency: state.currency,
  };
}

export default connect(mapStateToProps, maptDispatchToProps)(PhoneNav);
