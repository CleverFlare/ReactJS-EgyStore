import { Link } from "react-router-dom";
import "./components css/productSet.css";
import { connect } from "react-redux";
import { useState } from "react";

const Product = ({ productName, prodcutPrice, productImage, productRate }) => {
  const defaultStars = ["star", "star", "star", "star", "star"];
  return (
    <div className="products-set__product">
      <img src={productImage} alt="" className="products-set__product-img" />
      <div className="products-set__product-rate">
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
      </div>
      <Link to="" className="products-set__product-name">
        {productName}
      </Link>
      <p className="products-set__product-price">{prodcutPrice}</p>
    </div>
  );
};

const ProductsSet = ({ featuredProducts, trendingProducts, lang }) => {
  const [isFeatured, setIsFeatured] = useState(true);

  const handleToggle = () => {
    setIsFeatured(!isFeatured);
  };
  return (
    <div className="products-set">
      <div className="products-set__header">
        <button
          className={"products-set__heading" + ` ${isFeatured && "selected"}`}
          onClick={handleToggle}
        >
          {lang === "en" ? "Featured" : "مميزة"}
        </button>
        <button
          className={"products-set__heading" + ` ${!isFeatured && "selected"}`}
          onClick={handleToggle}
        >
          {lang === "en" ? "Trending" : "الأكثر رواجاً"}
        </button>
      </div>
      <div
        className={
          "products-set__trending-set excluded-fonts" +
          ` ${isFeatured && "selected"}`
        }
      >
        {featuredProducts &&
          featuredProducts.map((product, index) => (
            <Product
              key={index}
              productName={product.name}
              prodcutPrice={product.price}
              productImage={product.image}
              productRate={product.rate}
            />
          ))}
      </div>
      <div
        className={
          "products-set__trending-set excluded-fonts" +
          ` ${!isFeatured && "selected"}`
        }
      >
        {trendingProducts &&
          trendingProducts.map((product, index) => (
            <Product
              key={index}
              productName={product.name}
              prodcutPrice={product.price}
              productImage={product.image}
              productRate={product.rate}
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

export default connect(mapStateToProps)(ProductsSet);
