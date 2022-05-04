import { Link } from "react-router-dom";
import "./components css/catList.css";
import { connect } from "react-redux";

const CategoriesList = ({ categories, lang }) => {
  return (
    <div className="categories-list">
      <h2 className="categories-list__heading">
        {lang === "en" ? "categories" : "الأقسام"}
      </h2>
      <div className="categories-list__list">
        {categories.map((category, index) => (
          <Link
            className="categories-list__list-item"
            to={category.path}
            key={index}
          >
            {lang === "en" ? category.name : category.arname}
          </Link>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(CategoriesList);
