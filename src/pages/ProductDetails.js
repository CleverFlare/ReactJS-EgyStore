import Container from "../components/Container";
import NavBar from "../components/NavBar";
import "./pages css/productDetails.css";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const db = getFirestore();

const ProductDetailsPage = () => {
  const { category, productID } = useParams();
  const [data, setData] = useState(null);
  const [stars] = useState(["star", "star", "star", "star", "star"]);

  useEffect(() => {
    const docRef = doc(db, "categories", category);
    getDoc(docRef).then((res) => {
      setData(res.data()[productID]);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <div className="product-details excluded-fonts">
          <div className="product-details__image-wrapper">
            {data && (
              <img
                className="product-details__product-image"
                src={data.image}
              />
            )}
          </div>
          <div className="product-details__details-wrapper">
            <Link className="product-details__go-back" to={-1}>
              &#60; Go Back
            </Link>
            <h2 className="product-details__product-name">
              {data && data.name}
            </h2>
            <div className="product-details__product-details-description">
              <h2>Details:</h2>
              <pre>{data && data.details}</pre>
            </div>
            <p className="product-details__product-price">
              ${data && data.price}
            </p>
            <ul className="product-details__product-rate">
              {data &&
                stars.map((oneStar, index) => {
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
            <button className="product-details__cart-add">
              <span className="icon-shopping-cart"></span>
              Add to cart
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetailsPage;
