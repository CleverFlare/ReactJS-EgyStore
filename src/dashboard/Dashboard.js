import "./dashboard.css";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const ACTIONS = {
  SET_NAME: "set-name",
  SET_PRICE: "set-price",
  SET_RATE: "set-rate",
  SET_IMAGE: "set-image",
  SET_CATEGORY: "set-category",
  SET_DETAILS: "set-details",
  RESET: "reset",
};

const init = {
  name: "",
  price: "",
  rate: "",
  image: "",
  details: "",
  category: "mobiles",
};

function stateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };
    case ACTIONS.SET_PRICE:
      return { ...state, price: action.payload };
    case ACTIONS.SET_RATE:
      return { ...state, rate: action.payload };
    case ACTIONS.SET_IMAGE:
      return { ...state, image: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ACTIONS.SET_DETAILS:
      return { ...state, details: action.payload };
    case ACTIONS.RESET:
      return {
        ...state,
        name: "",
        price: "",
        rate: "",
        image: "",
        details: "",
      };
    default:
      return state;
  }
}

const db = getFirestore();

const DashBoard = () => {
  const [state, dispatch] = useReducer(stateReducer, init);
  const docRef = doc(db, "categories", state.category);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDoc(docRef, {
      [uuidv4()]: {
        name: state.name,
        image: state.image,
        details: state.details,
        price: Number(state.price),
        rate: Number(state.rate),
      },
    }).then((res) => {
      dispatch({ type: ACTIONS.RESET });
    });
  };

  return (
    <div className="dashboard excluded-fonts">
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="dashboard-form__input-wrapper">
          <label>product name</label>
          <input
            type="text"
            className="dashboard-form__product-name"
            value={state.name}
            onChange={(event) =>
              dispatch({ type: ACTIONS.SET_NAME, payload: event.target.value })
            }
          />
        </div>
        <div className="dashboard-form__input-wrapper">
          <label>product price</label>
          <input
            type="number"
            min="0"
            step="any"
            value={state.price}
            onChange={(event) =>
              dispatch({ type: ACTIONS.SET_PRICE, payload: event.target.value })
            }
            className="dashboard-form__product-price"
          />
        </div>
        <div className="dashboard-form__input-wrapper">
          <label>product rate</label>
          <select
            className="dashboard-form__product-rate"
            value={state.rate}
            onChange={(event) =>
              dispatch({ type: ACTIONS.SET_RATE, payload: event.target.value })
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="dashboard-form__input-wrapper">
          <label>product image</label>
          <input
            type="text"
            className="dashboard-form__product-image"
            value={state.image}
            onChange={(event) =>
              dispatch({ type: ACTIONS.SET_IMAGE, payload: event.target.value })
            }
          />
        </div>
        <div className="dashboard-form__input-wrapper">
          <label>product image</label>
          <textarea
            className="dashboard-form__product-details"
            value={state.details}
            onChange={(event) =>
              dispatch({
                type: ACTIONS.SET_DETAILS,
                payload: event.target.value,
              })
            }
          />
        </div>
        <div className="dashboard-form__input-wrapper">
          <label>category name</label>
          <select
            className="dashboard-form__category-name"
            value={state.category}
            onChange={(event) =>
              dispatch({
                type: ACTIONS.SET_CATEGORY,
                payload: event.target.value,
              })
            }
          >
            <option value="mobiles">Mobiles</option>
            <option value="men's">Men's Fashion</option>
            <option value="women's">Women's Fashion</option>
            <option value="kids'">Kids' Fashion</option>
            <option value="toys">Toys</option>
            <option value="electronics">Electronics</option>
            <option value="beauty">Beauty</option>
            <option value="home&kitchen">Home & Kitchen</option>
            <option value="televisions">Televisions</option>
          </select>
        </div>
        <input type="submit" value="done" />
      </form>
      <div className="dashbaord-sidebar"></div>
    </div>
  );
};

export default DashBoard;
