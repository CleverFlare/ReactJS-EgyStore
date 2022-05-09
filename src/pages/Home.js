import CategoriesList from "../components/CatList";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import ProductsList from "../components/ProductsList";
import Carousel from "../components/slideCarousel";
import "./pages css/home.css";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ProductsSet from "../components/ProductsSet";
import Testimonial from "../components/Testimonial";
import Ads from "../components/Ads";
import BrandsList from "../components/BrandsList";
import Footer from "../components/Footer";
import { connect } from "react-redux";

const db = getFirestore();

const colRef = collection(db, "website-products");

const q = query(colRef, where("featured", "==", true));

// const theImages = [
//   "https://thumbs.dreamstime.com/b/product-advertisement-beauty-cosmetic-cream-mockup-pretty-pink-color-great-health-facial-care-products-196679991.jpg",
//   "https://image.shutterstock.com/shutterstock/photos/552433030/display_1500/stock-vector-moisturizing-cosmetic-products-ad-light-blue-bokeh-background-with-beautiful-containers-and-watery-552433030.jpg",
//   "https://mobanko.com/wp-content/uploads/2019/06/%D8%A7%D9%81%D8%B6%D9%84-%D8%B3%D9%85%D8%A7%D8%B9%D8%A7%D8%AA-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%D8%AC-%D9%88%D9%87%D9%88%D8%A7%D9%88%D9%8A-%D8%A7%D9%84%D8%A7%D9%8A%D9%81%D9%88%D9%86.jpg",
//   "https://i.ytimg.com/vi/dm81YmIyBGU/maxresdefault.jpg",
// ];

const categories = [
  {
    name: "Mobiles",
    arname: "الموبايلات",
    path: "/mobiles",
  },
  {
    name: "Men's Fashion",
    arname: "ازياء رجالية",
    path: "/men's",
  },
  {
    name: "Women's Fashion",
    arname: "ازياء نسائية",
    path: "/women's",
  },
  {
    name: "Kids' Fashion",
    arname: "ازياء اطفال",
    path: "/kids'",
  },
  {
    name: "Toys",
    arname: "العاب",
    path: "/toys",
  },
  {
    name: "Electronics",
    arname: "إليكترونيات",
    path: "/electronics",
  },
  {
    name: "Beauty",
    arname: "مكياج",
    path: "/beauty",
  },
  {
    name: "Home & Kitchen",
    arname: "البيت والمطبخ",
    path: "/home&kitchen",
  },
  {
    name: "Televisions",
    arname: "تلفزيونات",
    path: "/televisions",
  },
];

const testimonials = [
  {
    name: "Kristen",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores voluptas labore inventore ex provident numquam magnam accusantium tempora repellat, laudantium voluptatem blanditiis soluta neque. Nisi mollitia amet quam ad natus?",
    image: "images/woman avatar.jpg",
  },
  {
    name: "Kotlin",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores voluptas labore inventore ex provident numquam magnam accusantium tempora repellat, laudantium voluptatem blanditiis soluta neque. Nisi mollitia amet quam ad natus?",
    image: "images/woman avatar.jpg",
  },
  {
    name: "Sandy",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores voluptas labore inventore ex provident numquam magnam accusantium tempora repellat, laudantium voluptatem blanditiis soluta neque. Nisi mollitia amet quam ad natus?",
    image: "images/woman avatar.jpg",
  },
];

const HomePage = ({ cred, setCred }) => {
  const [images, setImages] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      setImages(snapshot.docs[0].data().carousel);
      setProducts(snapshot.docs[0].data()["best seller"]);
    });
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <div className="content-grid">
          <CategoriesList categories={categories} />
          <Carousel images={images} />
          <ProductsList
            entitle="Best Seller"
            artitle="الأكثر مبيعاً"
            prodcuts={products}
          />
          <ProductsList entitle="On Sale" artitle="للبيع" prodcuts={products} />
          <ProductsSet
            featuredProducts={products}
            trendingProducts={products}
          />
          <Testimonial testimonials={testimonials} />
          <Ads />
          <BrandsList />
        </div>
      </Container>
      <Footer />
    </>
  );
};

function mapStateToProps(state) {
  return {
    cred: state.cred,
  };
}

export default connect(mapStateToProps)(HomePage);
