import Header from "./Header";
import TopNav from "./TopNav";
import PhoneNav from "./PhoneNav";
import "./components css/navbar.css";
import DesktopNav from "./DesktopNav";

const NavBar = () => {
  return (
    <div>
      <div className="desktop">
        <TopNav />
        <Header />
        <DesktopNav />
      </div>
      <div className="phone">
        <PhoneNav />
      </div>
    </div>
  );
};

export default NavBar;
