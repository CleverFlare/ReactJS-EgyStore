import "./pages css/brands.css";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore();

const colRef = collection(db, "categories");

const BrandProduct = ({ name, price, path, picture, stars, brand }) => {
  const [starsTemplate, setStarsTemplate] = useState([
    "star",
    "star",
    "star",
    "star",
    "star",
  ]);
  return (
    <div className="brands__product-item">
      <Link to={path} className="brands__image-wrapper">
        <img src={picture} className="brands__product-image" />
      </Link>
      <div className="brands__product-details">
        <Link to={path} className="brands__product-name">
          {name}
        </Link>
        <p className="brands__product-price">${price}</p>
        <div className="brands__product-footer">
          <ul className="brands__product-rate">
            {starsTemplate.map((star, index) => {
              if (index < stars) {
                return <li className="stard">★</li>;
              } else {
                return <li>★</li>;
              }
            })}
          </ul>
          <p className="brands__product-brand">{brand}</p>
        </div>
      </div>
    </div>
  );
};

const Brands = () => {
  const [brandsArray, setBrandsArray] = useState([]);

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        const docID = doc.id;
        const brandedItems = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].brand && doc.data()[item].brand !== "null";
        });

        brandedItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setBrandsArray((oldArray) => [...oldArray, product]);
        });
      });
    });
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <div className="brands-page">
          {brandsArray &&
            brandsArray.map((brandedProduct, index) => {
              return (
                <BrandProduct
                  key={index}
                  name={brandedProduct.name}
                  picture={brandedProduct.image[0]}
                  stars={brandedProduct.rate}
                  price={brandedProduct.price}
                  brand={brandedProduct.brand}
                  path={`/${brandedProduct.category}/${brandedProduct.productID}`}
                />
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Brands;
