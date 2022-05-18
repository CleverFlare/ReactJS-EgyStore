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
  const amountOfProducts = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [data, setData] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      // console.log(snapshot.docs.length / 10);
      snapshot.docs.forEach((doc) => {
        if (doc.id === category) {
          const limit = Math.ceil(Object.keys(doc.data()).length / 10);
          setTotalPages(limit);
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
            Object.keys(data)
              .slice(amountOfProducts * (page - 1), page * amountOfProducts)
              .map((item, index) => {
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

function mapStateToProps(state) {
  return {
    currency: state.currency,
  };
}

export default connect(mapStateToProps)(CategoryPage);
