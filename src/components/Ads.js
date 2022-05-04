import "./components css/ads.css";

const Ads = ({ images }) => {
  return (
    <div className="ads">
      <img src="images/iphone.png" className="ad-num-1" />
      <img src="images/pc.png" className="ad-num-2" />
    </div>
  );
};

export default Ads;
