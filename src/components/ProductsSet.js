import { Link } from "react-router-dom";
import "./components css/productSet.css";
import { connect } from "react-redux";
import { useState } from "react";

const ProductSkeleton = () => {
  return (
    <div className="skeleton-products-set__product">
      <div className="skeleton-products-set__product-img"></div>
      <div className="skeleton-products-set__product-rate"></div>
      <div className="skeleton-products-set__product-name"></div>
      <div className="skeleton-products-set__product-price"></div>
    </div>
  );
};

const Product = ({
  productName,
  prodcutPrice,
  productImage,
  productRate,
  productPath,
  currency,
}) => {
  const defaultStars = ["star", "star", "star", "star", "star"];
  return (
    <div className="products-set__product">
      <img src={productImage[0]} alt="" className="products-set__product-img" />
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
      <Link to={productPath} className="products-set__product-name">
        {productName}
      </Link>
      <p className="products-set__product-price">
        ${(prodcutPrice * currency.convertor).toFixed(2)}
      </p>
    </div>
  );
};

const ProductsSet = ({
  featuredProducts,
  trendingProducts,
  lang,
  currency,
}) => {
  const [currentTab, setCurrentTab] = useState("featured");

  const handleToggle = (value) => {
    setCurrentTab(value);
  };
  return (
    <div className="products-set">
      <div className="products-set__header">
        <button
          className={
            "products-set__heading" +
            ` ${currentTab === "featured" && "selected"}`
          }
          onClick={() => handleToggle("featured")}
        >
          {lang === "en" ? "Featured" : "مميزة"}
        </button>
        <button
          className={
            "products-set__heading" +
            ` ${currentTab === "trending" && "selected"}`
          }
          onClick={() => handleToggle("trending")}
        >
          {lang === "en" ? "Trending" : "الأكثر رواجاً"}
        </button>
      </div>
      <div
        className={
          "products-set__trending-set excluded-fonts" +
          ` ${currentTab === "featured" && "selected"}`
        }
      >
        {featuredProducts <= 0 && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
        {featuredProducts.length > 0 &&
          featuredProducts.map((product, index) => (
            <Product
              key={index}
              productName={product.name}
              prodcutPrice={product.price}
              productImage={product.image}
              productRate={product.rate}
              productPath={`/${product.category}/${product.productID}`}
              currency={currency}
            />
          ))}
      </div>
      <div
        className={
          "products-set__trending-set excluded-fonts" +
          ` ${currentTab === "trending" && "selected"}`
        }
      >
        {trendingProducts.length <= 0 && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
        {trendingProducts.length > 0 &&
          trendingProducts.map((product, index) => (
            <Product
              key={index}
              productName={product.name}
              prodcutPrice={product.price}
              productImage={product.image}
              productRate={product.rate}
              productPath={`/${product.category}/${product.productID}`}
              currency={currency}
            />
          ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    currency: state.currency,
  };
}

export default connect(mapStateToProps)(ProductsSet);
