import Container from "../components/Container";
import NavBar from "../components/NavBar";
import "./pages css/category.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

const colRef = collection(db, "categories");

const Product = ({ data, id }) => {
  const [srars] = useState(["star", "star", "star", "star", "star"]);

  return (
    <div className="categorized-product">
      <Link to={id} className="categorized-product__img-wrapper">
        <img
          className="categorized-product__product-image"
          src={data.image}
          alt="product name"
        />
      </Link>
      <div className="categorized-product__details-wrapper">
        <Link to={id} className="categorized-product__product-name">
          {data.name}
        </Link>
        <Link to={id} className="categorized-product__product-price">
          ${data.price}
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

const CategoryPage = () => {
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
              return <Product key={index} data={data[item]} id={item} />;
            })}
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
