import Container from "../components/Container";
import NavBar from "../components/NavBar";
import "./pages css/search.css";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const db = getFirestore();

const colRef = collection(db, "categories");

const SearchedProduct = ({ name, price, path, picture, stars }) => {
  const [starsTemplate, setStarsTemplate] = useState([
    "star",
    "star",
    "star",
    "star",
    "star",
  ]);
  return (
    <div className="search__product-item">
      <Link to={path} className="search__image-wrapper">
        <img src={picture} className="search__product-image" />
      </Link>
      <div className="search__product-details">
        <Link to={path} className="search__product-name">
          {name}
        </Link>
        <p className="search__product-price">${price}</p>
        <ul className="search__product-rate">
          {starsTemplate.map((star, index) => {
            if (index < stars) {
              return <li className="stard">★</li>;
            } else {
              return <li>★</li>;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

const SearchPage = ({ search }) => {
  const [searchedArray, setSearchedArray] = useState([]);

  useEffect(() => {
    if (!search) return;
    getDocs(colRef).then((snapshot) => {
      setSearchedArray([]);
      snapshot.forEach((doc) => {
        const docID = doc.id;
        const specialItems = Object.keys(doc.data()).filter((item) => {
          const searchedItem = search.toLowerCase() + " ";
          const itemsName = doc.data()[item].name.toLowerCase();
          return itemsName.includes(searchedItem);
        });

        specialItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setSearchedArray((oldArray) => [...oldArray, product]);
        });
        console.log(searchedArray);
      });
    });
  }, [search]);

  return (
    <>
      <NavBar />
      <Container>
        <div className="search">
          {searchedArray.length <= 0 && <p>No Results...</p>}
          {searchedArray &&
            searchedArray.map((searchedProduct, index) => {
              return (
                <SearchedProduct
                  key={index}
                  name={searchedProduct.name}
                  picture={searchedProduct.image[0]}
                  stars={searchedProduct.rate}
                  price={searchedProduct.price}
                  path={`/${searchedProduct.category}/${searchedProduct.productID}`}
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
    search: state.search,
  };
}

export default connect(mapStateToProps)(SearchPage);
