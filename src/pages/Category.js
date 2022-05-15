import Container from "../components/Container";
import NavBar from "../components/NavBar";
import "./pages css/category.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

const colRef = collection(db, "categories");

const Product = ({ data, id, currency }) => {
  const [srars] = useState(["star", "star", "star", "star", "star"]);

  return (
    <div
      className={`categorized-product ${data.isSpecial && "special-product"}`}
    >
      <Link to={id} className="categorized-product__img-wrapper">
        <img
          className="categorized-product__product-image"
          src={data.image[0]}
          alt="product name"
        />
      </Link>
      <div className="categorized-product__details-wrapper">
        <Link to={id} className="categorized-product__product-name">
          {data.name}
        </Link>
        <Link to={id} className="categorized-product__product-price">
          ${(data.price * currency.convertor).toFixed(2)}
        </Link>
        <ul className="categorized-product__product-rate">
          {srars.map((star, index) => {
            if (index < data.rate) {
              return (
                <li className="stard" key={index}>
                  ★
                </li>
              );
            }
            return <li key={index}>★</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

const CategoryPage = ({ currency }) => {
  const [data, setData] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === category) {
          return setData(doc.data());
        }
        return;
      });
    });
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <div className="products-grid excluded-fonts">
          {!data && <p className="loading">Loading...</p>}
          {data &&
            Object.keys(data).map((item, index) => {
              return (
                <Product
                  key={index}
                  data={data[item]}
                  id={item}
                  currency={currency}
                />
              );
            })}
        </div>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    currency: state.currency,
  };
}

export default connect(mapStateToProps)(CategoryPage);
