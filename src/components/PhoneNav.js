import { React, useState } from "react";
import ReactDOM from "react-dom";
import "./components css/phoneNav.css";
import Container from "./Container";

const PhoneMenu = () => {
  return (
    <div className="phone-nav__phone-menu">
      <div className="phone-menu__wrapper">
        <button id="avatar"></button>
        <div className="phone-nav__anchor-list">
          <a href="">
            <span className="icon-home"></span>
            <p>home</p>
          </a>
          <a href="">
            <span className="icon-crown"></span>
            <p>Special Offers</p>
          </a>
          <a href="">
            <span className="icon-shopping-bag"></span>
            <p>Brands</p>
          </a>
          <a href="">
            <span className="icon-thumbs-up"></span>
            <p>Sell On EgyStore</p>
          </a>
          <a href="" style={{ backgroundColor: "#f5b841" }}>
            <span className="icon-shopping-cart"></span>
            <p>Your Cart</p>
          </a>
        </div>
      </div>
    </div>
  );
};

const PhoneNav = () => {
  const handleMenuToggle = () => {
    document.getElementById("root").classList.toggle("moveForMenu");
  };
  return (
    <div className="phone-nav">
      <Container>
        <div className="phone-nav__items-wrapper">
          <img className="phone-nav__logo" src="./images/phone logo.png" />
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
        </div>
      </Container>
      {ReactDOM.createPortal(<PhoneMenu />, document.body)}
    </div>
  );
};

export default PhoneNav;
