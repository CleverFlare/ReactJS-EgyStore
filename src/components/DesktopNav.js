import { useState, useEffect } from "react";
import "./components css/desktopNav.css";
import Container from "./Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DesktopNav = ({ token, lang, cred }) => {
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
            <Link to="/account" id="avatar">
              <img src={cred && cred.photoURL} />
            </Link>
          ) : (
            <Link to="/account/login" className="first-button-style" id="login">
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
    cred: state.cred,
  };
}

export default connect(mapStateToProps)(DesktopNav);

// {
//   "uid": "C4sZ2TmK8yUM3p7D08resDSr3jo1",
//   "email": "test@gmail.com",
//   "emailVerified": false,
//   "displayName": "test",
//   "isAnonymous": false,
//   "photoURL": "https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/default%20avatar.png?alt=media&token=9d150bd6-79e3-452c-8512-fca0ccc39f5f",
//   "providerData": [
//       {
//           "providerId": "password",
//           "uid": "test@gmail.com",
//           "displayName": "test",
//           "email": "test@gmail.com",
//           "phoneNumber": null,
//           "photoURL": "https://firebasestorage.googleapis.com/v0/b/egystore-682f9.appspot.com/o/default%20avatar.png?alt=media&token=9d150bd6-79e3-452c-8512-fca0ccc39f5f"
//       }
//   ],
//   "stsTokenManager": {
//       "refreshToken": "AIwUaOkRccernNjeisSfSVyqgZjqk3Sgw1CQB88Mo0DPBO1PvOQNYvZiFaMcArdcD02IFlMRPWhbEj66hXDlfQMdub9wvA9IVfqLNs-AtQbD3-dpYetTx5wKDWaO2EM3Lt3wBAs5WcEa9fajSBJlq2QvpFRQYhOqwAC4UyVrnEKgxRm-pv8At4_5qPg_jSR82OYu2jtvjfiEOBnLELWUpy6E5RbzkzktAQ",
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlYmYxMDBlYWRkYTMzMmVjOGZlYTU3ZjliNWJjM2E2YWIyOWY1NTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWd5c3RvcmUtNjgyZjkiLCJhdWQiOiJlZ3lzdG9yZS02ODJmOSIsImF1dGhfdGltZSI6MTY1MjA0NzY2OCwidXNlcl9pZCI6IkM0c1oyVG1LOHlVTTNwN0QwOHJlc0RTcjNqbzEiLCJzdWIiOiJDNHNaMlRtSzh5VU0zcDdEMDhyZXNEU3Izam8xIiwiaWF0IjoxNjUyMDQ3NjY4LCJleHAiOjE2NTIwNTEyNjgsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.q7uktv87ydS87M2nIvRRtgscTrDQ5Hs_sqqt7CpryxGtJYuy954IejxYBOsV6ud0N0MSmFEnoX9ADFmuMRKKauITS6UPBhPzXQDmPRf7DGt1o9abaWcrSab2kD1yPZBX2AaN4XfCAPYZaBOrlaDAw9_J5WhwoNWzB48FY5GO4bDyH_dA-RbnLWIQ5cZKdttOxM2KlYPJXyLjd0pdXA505uY3bre-Wsb1IKINXdlmTq1ZpZS5NMjlWhOjaXQt5la5XH3OCV7wCrxiqzdHjxGB_caNX42f-yXzxSt0yeFeaV4l3bSvO-bEJtwVjEo9BHQjEysk9IIE1Te0j4xYbNUxCQ",
//       "expirationTime": 1652051268685
//   },
//   "createdAt": "1652047667931",
//   "lastLoginAt": "1652047667931",
//   "apiKey": "AIzaSyBq_Vt95z4KOThZIjyCl_Saq3JwB_HmbtE",
//   "appName": "[DEFAULT]"
// }
