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

const SpecialOffersProduct = ({ name, price, path, picture, stars }) => {
  const [starsTemplate, setStarsTemplate] = useState([
    "star",
    "star",
    "star",
    "star",
    "star",
  ]);
  return (
    <div className="special-offers__product-item">
      <Link to={path} className="special-offers__image-wrapper">
        <img src={picture} className="special-offers__product-image" />
      </Link>
      <div className="special-offers__product-details">
        <Link to={path} className="special-offers__product-name">
          {name}
        </Link>
        <p className="special-offers__product-price">${price}</p>
        <ul className="special-offers__product-rate">
          {starsTemplate.map((star, index) => {
            if (index < stars) {
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

const SpecialOffers = () => {
  const amountOfProducts = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
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
  useEffect(() => {
    setTotalPages(Math.ceil(specialOffersArray.length / amountOfProducts));
  }, [specialOffersArray]);
  return (
    <>
      <NavBar />
      <Container>
        <div className="special-offers">
          {specialOffersArray &&
            specialOffersArray
              .slice(amountOfProducts * (page - 1), page * amountOfProducts)
              .map((specialProduct, index) => {
                return (
                  <SpecialOffersProduct
                    key={index}
                    name={specialProduct.name}
                    picture={specialProduct.image[0]}
                    stars={specialProduct.rate}
                    price={specialProduct.price}
                    path={`/${specialProduct.category}/${specialProduct.productID}`}
                  />
                );
              })}
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </Container>
    </>
  );
};
const Pagination = ({ page, totalPages, setPage }) => {
  const handleNextPage = () => {
    if (page + 1 > totalPages) return;
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page - 1 < 1) return;
    setPage(page - 1);
  };

  const handleDynamicPagination = (event) => {
    if (event.target.value < 1) return;
    if (event.target.value > totalPages) return;
    setPage(event.target.value);
  };

  const handlePagination = (event) => {
    event.preventDefault();
  };

  return (
    <form className="category__pagination-wrapper" onSubmit={handlePagination}>
      <button
        className="category__pagination-button"
        onClick={handlePreviousPage}
      >
        &lt;
      </button>
      <input
        className="category__pagination-input"
        type="number"
        value={page}
        min={1}
        max={totalPages}
        onChange={handleDynamicPagination}
      />
      <p className="category__pagination-total">/ {totalPages}</p>
      <button className="category__pagination-button" onClick={handleNextPage}>
        &gt;
      </button>
    </form>
  );
};

export default SpecialOffers;
