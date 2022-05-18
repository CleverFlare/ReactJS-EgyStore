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
                return (
                  <li className="stard" key={index}>
                    ★
                  </li>
                );
              } else {
                return <li key={index}>★</li>;
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
  const amountOfProducts = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
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
  useEffect(() => {
    setTotalPages(Math.ceil(brandsArray.length / amountOfProducts));
  }, [brandsArray]);
  return (
    <>
      <NavBar />
      <Container>
        <div className="brands-page">
          {brandsArray &&
            brandsArray
              .slice(amountOfProducts * (page - 1), page * amountOfProducts)
              .map((brandedProduct, index) => {
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

export default Brands;
