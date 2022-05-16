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
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const db = getFirestore();

const DetailsPop = ({ details, isActive, setIsActive }) => {
  const handleExist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      event.target.className === "product-details__popup-modal" ||
      event.target.className === "product-details__popup-text"
    )
      return;
    setIsActive(false);
  };
  return (
    <div
      className={`product-details__popup-details ${isActive && "active"}`}
      onClick={handleExist}
    >
      <button className="product-details__popup-details-close-button">x</button>
      <div className="product-details__popup-modal">
        <pre className="product-details__popup-text">{details}</pre>
      </div>
    </div>
  );
};

const Product = ({ data, id, category, currency }) => {
  const [srars] = useState(["star", "star", "star", "star", "star"]);

  return (
    <div
      className={`product-details__product ${
        data?.isSpecial && "special-product"
      }`}
    >
      <Link
        to={`/${category}/${id}`}
        className="product-details__product__img-wrapper"
      >
        <img
          className="product-details__product__product-image"
          src={data.image[0]}
          alt="product name"
        />
      </Link>
      <div className="product-details__product__details-wrapper">
        <Link
          to={`/${category}/${id}`}
          className="product-details__product__product-name"
        >
          {data.name}
        </Link>
        <Link
          to={`/${category}/${id}`}
          className="product-details__product__product-price"
        >
          ${(data.price * currency.convertor).toFixed(2)}
        </Link>
        <ul className="product-details__product__product-rate">
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

function randomize(min, max) {
  return Math.floor(Math.random() * max - min);
}

const ProductDetailsPage = ({ currency, token }) => {
  const { category, productID } = useParams();
  const [data, setData] = useState(null);
  const [stars] = useState(["star", "star", "star", "star", "star"]);
  const [selectedColor, setSelectedColor] = useState("default");
  const [size, setSize] = useState("m");
  const [allowSize, setAllowSize] = useState(false);
  const [blend, setBlend] = useState("transparent");
  const [showPopup, setShowPopup] = useState(false);
  const [displayedPicture, setDisplayedPciture] = useState();
  const [othersArray, setOthersArray] = useState([]);
  const [isCarted, setIsCarted] = useState(false);

  const handlePicturesToggle = (event) => {
    setDisplayedPciture(event.target.src);
  };

  const handleColors = (event) => {
    setBlend(event.target.value);
    setSelectedColor(event.target.value);
  };

  const handleAddToCart = () => {
    const docRef = doc(db, "users", `${token}`);
    getDoc(docRef).then((res) => {
      const user = res.data();
      user.cart = {
        ...user.cart,
        [productID]: {
          image: displayedPicture,
          name: data.name,
          price: data.price,
          color: selectedColor,
          size:
            category === "men's" ||
            category === "women's" ||
            category === "kid's"
              ? size
              : null,
          path: `/${category}/${productID}`,
        },
      };
      updateDoc(docRef, user);
    });
  };

  useEffect(() => {
    const docRef = doc(db, "categories", category);
    const userRef = doc(db, "users", `${token}`);

    if (token) {
      onSnapshot(userRef, (res) => {
        if (
          res.data().cart &&
          Object.keys(res.data().cart).includes(productID)
        ) {
          setIsCarted(true);
        }
      });
    }

    getDoc(docRef).then((res) => {
      setData(res.data()[productID]);
      setDisplayedPciture(res.data()[productID].image[0]);
      const keys = Object.keys(res.data());
      const product1ID = keys[randomize(0, keys.length)];
      const product2ID = keys[randomize(0, keys.length)];
      const product3ID = keys[randomize(0, keys.length)];
      const product4ID = keys[randomize(0, keys.length)];
      const product1 = res.data()[product1ID];
      const product2 = res.data()[product2ID];
      const product3 = res.data()[product3ID];
      const product4 = res.data()[product4ID];
      product1.id = product1ID;
      product2.id = product2ID;
      product3.id = product3ID;
      product4.id = product4ID;
      setOthersArray([product1, product2, product3, product4]);
    });
  }, [productID, token]);

  return (
    <>
      <NavBar />
      <Container>
        <DetailsPop
          details={data && data.details}
          isActive={showPopup}
          setIsActive={setShowPopup}
        />
        <div className="product-details">
          <div className="product-details__product-preview">
            <div className="product-details__image-wrapper">
              {category === "mobiles" && (
                <div
                  className="product-details__blending-layer"
                  style={{ backgroundColor: blend }}
                ></div>
              )}
              {!data && <div className="product-details__skeleton"></div>}
              {data && (
                <img
                  className="product-details__product-image"
                  src={displayedPicture}
                />
              )}
            </div>
            <div className="product-details__product-pictures">
              {!data && (
                <>
                  <span className="product-details__product-picture">
                    <div className="product-details__skeleton"></div>
                  </span>
                  <span className="product-details__product-picture">
                    <div className="product-details__skeleton"></div>
                  </span>
                  <span className="product-details__product-picture">
                    <div className="product-details__skeleton"></div>
                  </span>
                  <span className="product-details__product-picture">
                    <div className="product-details__skeleton"></div>
                  </span>
                  <span className="product-details__product-picture">
                    <div className="product-details__skeleton"></div>
                  </span>
                </>
              )}
              {data &&
                data.image.map((item, index) => {
                  if (!item) return;
                  return (
                    <span
                      key={index}
                      className="product-details__product-picture"
                      onClick={handlePicturesToggle}
                    >
                      <img src={item} />
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="product-details__details-wrapper">
            <Link className="product-details__go-back" to={`/${category}`}>
              &#60; Go Back
            </Link>
            <h2 className="product-details__product-name">
              {data && data.name}
            </h2>
            {(category === "men's" ||
              category === "women's" ||
              category === "kid's") && (
              <div className="product-details__sizes">
                {data &&
                  data.sizes &&
                  data.sizes.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={`product-details__size-${item} ${
                          size === item && "active"
                        }`}
                        onClick={() => setSize(item)}
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            )}
            <select
              className="product-details__colors"
              defaultValue={"select color"}
              onChange={handleColors}
            >
              <option value="select color" disabled>
                select color
              </option>
              <option value="select color" disabled>
                ----
              </option>
              <option value="transparent">default</option>
              {data &&
                data.colors &&
                data.colors.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
            </select>
            <div className="product-details__product-details-description">
              <h2>Details:</h2>
              <pre onClick={() => setShowPopup(true)}>
                {!data && <div className="product-details__skeleton"></div>}
                {data && data.details}
              </pre>
            </div>
            <p className="product-details__product-price">
              ${data && (data.price * currency.convertor).toFixed(2)}
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
            {token && !isCarted ? (
              <button
                className="product-details__cart-add"
                onClick={handleAddToCart}
              >
                <span className="icon-shopping-cart"></span>
                Add to cart
              </button>
            ) : (
              <button className="product-details__carted">
                <span className="icon-shopping-cart"></span>
                Carted
              </button>
            )}
          </div>
          <div className="product-details__other-products">
            <h2 className="product-details__others-title">From category</h2>
            <div className="product-details__others-grid">
              {othersArray.length > 0 &&
                othersArray.map((item, index) => {
                  return (
                    <Product
                      key={index}
                      id={item.id}
                      data={item}
                      category={category}
                      currency={currency}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    currency: state.currency,
  };
}

export default connect(mapStateToProps)(ProductDetailsPage);
