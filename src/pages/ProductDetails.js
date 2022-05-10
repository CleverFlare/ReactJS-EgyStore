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

const ProductDetailsPage = () => {
  const { category, productID } = useParams();
  const [data, setData] = useState(null);
  const [stars] = useState(["star", "star", "star", "star", "star"]);
  const [size, setSize] = useState("m");
  const [blend, setBlend] = useState("transparent");
  const [showPopup, setShowPopup] = useState(false);
  const [displayedPicture, setDisplayedPciture] = useState();

  const handlePicturesToggle = (event) => {
    setDisplayedPciture(event.target.src);
  };

  const handleBlend = (event) => {
    setBlend(event.target.value);
  };

  useEffect(() => {
    const docRef = doc(db, "categories", category);
    getDoc(docRef).then((res) => {
      setData(res.data()[productID]);
      setDisplayedPciture(res.data()[productID].image);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <DetailsPop
          details={data && data.details}
          isActive={showPopup}
          setIsActive={setShowPopup}
        />
        <div className="product-details excluded-fonts">
          <div className="product-details__product-preview">
            <div className="product-details__image-wrapper">
              {category === "mobiles" && (
                <div
                  className="product-details__blending-layer"
                  style={{ backgroundColor: blend }}
                ></div>
              )}
              {data && (
                <img
                  className="product-details__product-image"
                  src={displayedPicture}
                />
              )}
            </div>
            <div className="product-details__product-pictures">
              {data &&
                data.image.map((item, index) => {
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
            <Link className="product-details__go-back" to={-1}>
              &#60; Go Back
            </Link>
            <h2 className="product-details__product-name">
              {data && data.name}
            </h2>
            {(category === "men's" ||
              category === "women's" ||
              category === "kid's") && (
              <div className="product-details__sizes">
                <span
                  className={`product-details__size-m ${
                    size === "m" && "active"
                  }`}
                  onClick={() => setSize("m")}
                >
                  m
                </span>
                <span
                  className={`product-details__size-l ${
                    size === "l" && "active"
                  }`}
                  onClick={() => setSize("l")}
                >
                  l
                </span>
                <span
                  className={`product-details__size-xl ${
                    size === "xl" && "active"
                  }`}
                  onClick={() => setSize("xl")}
                >
                  xl
                </span>
                <span
                  className={`product-details__size-xxl ${
                    size === "xxl" && "active"
                  }`}
                  onClick={() => setSize("xxl")}
                >
                  xxl
                </span>
                <span
                  className={`product-details__size-xxxl ${
                    size === "xxxl" && "active"
                  }`}
                  onClick={() => setSize("xxxl")}
                >
                  xxxl
                </span>
              </div>
            )}
            <select
              className="product-details__colors"
              defaultValue={"select color"}
              onChange={handleBlend}
            >
              <option value="select color" disabled>
                select color
              </option>
              <option value="select color" disabled>
                ----
              </option>
              <option value="transparent">default</option>
              <option value="green">green</option>
              <option value="yellow">yellow</option>
              <option value="gray">gray</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
            </select>
            <div className="product-details__product-details-description">
              <h2>Details:</h2>
              <pre onClick={() => setShowPopup(true)}>
                {data && data.details}
              </pre>
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
