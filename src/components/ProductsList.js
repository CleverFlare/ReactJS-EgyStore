import "./components css/productsList.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SkeletonProduct = () => {
  return (
    <div className="skeleton-product-list__item">
      <div className="skeleton-product-list__item__image"></div>
      <div className="skeleton-product-list__item__details">
        <div className="skeleton-product-name"></div>
        <div className="skeleton-product-price"></div>
        <div className="skeleton-product-rate"></div>
      </div>
    </div>
  );
};

const Product = ({ productName, productPrice, productRate, productImg }) => {
  const defaultStars = ["star", "star", "star", "star", "star"];

  return (
    <div className="product-list__item excluded-fonts">
      <img src={productImg} className="product-list__item__image" />
      <div className="product-list__item__details">
        <Link to="" className="product-name">
          {productName}
        </Link>
        <p className="product-price">{productPrice}</p>
        <ul className="product-rate">
          {defaultStars.map((star, index) => {
            if (index < productRate) {
              return (
                <li key={index} className="stard">
                  ★
                </li>
              );
            } else {
              return <li key={index}>★</li>;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

const ProductsList = ({ lang, entitle, artitle, prodcuts }) => {
  return (
    <div className="products-list">
      <h2 className="products-list__heading">
        {lang === "en" ? entitle : artitle}
      </h2>
      <div className="products-list__list">
        {!prodcuts && (
          <>
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
          </>
        )}
        {prodcuts &&
          prodcuts.map((product, index) => (
            <Product
              key={index}
              productName={product.name}
              productPrice={product.price}
              productRate={product.rate}
              productImg={product.image}
            />
          ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(ProductsList);
