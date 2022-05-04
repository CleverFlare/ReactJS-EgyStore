import "./components css/topNav.css";
import { connect } from "react-redux";

const TopNav = ({ lang, token, dispatch }) => {
  const handleLang = (event) => {
    dispatch(event.target.value);
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
            <select id="pick-currency">
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: (value) => {
      dispatch({ type: "CHANGE_LANG", payload: value });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
