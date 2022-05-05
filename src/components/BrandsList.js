import "./components css/brandsList.css";

const BrandsList = () => {
  return (
    <div className="brands-list">
      <div className="brands-list__image-wrapper">
        <img src="images/nike_logo.png" alt="nike logo" />
      </div>
      <div className="brands-list__image-wrapper">
        <img src="images/adidas_logo.png" alt="adidas logo" />
      </div>
      <div className="brands-list__image-wrapper">
        <img src="images/apple_logo.png" alt="apple logo" />
      </div>
      <div className="brands-list__image-wrapper">
        <img src="images/samsung_logo.png" alt="samsung logo" />
      </div>
    </div>
  );
};

export default BrandsList;
