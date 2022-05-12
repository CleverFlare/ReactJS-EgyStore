import NavBar from "../components/NavBar";
import Container from "../components/Container";
import "./pages css/specialoffers.css";
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

const SpecialOffersProduct = ({ name, path, picture }) => {
  return (
    <div className="special-offers__product-item">
      <Link to={path} className="special-offers__image-wrapper">
        <img src={picture} className="special-offers__product-image" />
      </Link>
      <div className="special-offers__product-details">
        <Link to={path} className="special-offers__product-name">
          {name}
        </Link>
        <p className="special-offers__product-price">$00.00</p>
        <ul className="special-offers__product-rate">
          <li className="stard">★</li>
          <li className="stard">★</li>
          <li className="stard">★</li>
          <li>★</li>
          <li>★</li>
        </ul>
      </div>
    </div>
  );
};

const SpecialOffers = () => {
  const [specialOffersArray, setSpecialOffersArray] = useState([]);

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        const docID = doc.id;
        const specialItems = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].isSpecial === true;
        });

        specialItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setSpecialOffersArray((oldArray) => [...oldArray, product]);
        });
      });
    });
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <div className="special-offers">
          {specialOffersArray &&
            specialOffersArray.map((specialProduct, index) => {
              return (
                <SpecialOffersProduct
                  key={index}
                  name={specialProduct.name}
                  picture={specialProduct.image[0]}
                  path={`/${specialProduct.category}/${specialProduct.productID}`}
                />
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default SpecialOffers;
