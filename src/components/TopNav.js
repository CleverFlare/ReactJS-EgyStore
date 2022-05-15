import "./components css/topNav.css";
import { connect } from "react-redux";

const TopNav = ({ lang, token, dispatchLang, dispatchCurrency, currency }) => {
  const handleLang = (event) => {
    dispatchLang(event.target.value);
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
  return (
    <div className="top-nav excluded-fonts">
      <div className="top-nav__social-media-icons">
        <a href="">
          <span className="icon-facebook"></span>
        </a>
        <a href="">
          <span className="icon-twitter"></span>
        </a>
        <a href="">
          <span className="icon-linkedin"></span>
        </a>
        <a href="">
          <span className="icon-instagram"></span>
        </a>
      </div>
      <div className="top-nav__site-configs">
        {token && (
          <div className="top-nav__config-wrapper">
            <label>
              <span className="icon-currency"></span>
            </label>
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
          </div>
        )}
        <div className="top-nav__config-wrapper">
          <label>
            <span className="icon-flag"></span>
          </label>
          <select id="pick-lang" value={lang} onChange={handleLang}>
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>
        {token && (
          <div className="top-nav__config-wrapper">
            <label>
              <span className="icon-lang"></span>
            </label>
            <select id="pick-country">
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Emirats">Emirats</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    lang: state.lang,
    currency: state.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLang: (value) => {
      dispatch({ type: "CHANGE_LANG", payload: value });
    },
    dispatchCurrency: (value) => {
      dispatch({ type: "CHANGE_CURRENCY", payload: value });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
