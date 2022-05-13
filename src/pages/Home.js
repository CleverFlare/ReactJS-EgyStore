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
  getDoc,
  doc,
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

const categoriesRef = collection(db, "categories");

const q = query(colRef, where("featured", "==", true));

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
  const [testimonial, setTestimonial] = useState([]);
  const [onsale, setOnsale] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const testimonial = doc(db, "website-products", "testimonial");
    getDocs(colRef).then((snapshot) => {
      setImages(snapshot.docs[0].data().carousel);
    });
    getDoc(testimonial).then((snapshot) => {
      Object.keys(snapshot.data()).map((item) => {
        const indvid = snapshot.data()[item];
        indvid.name = item;
        setTestimonial((oldArr) => [...oldArr, indvid]);
      });
    });
    getDocs(categoriesRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        const docID = doc.id;
        const onsaleFilter = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].onsale === true;
        });

        onsaleFilter.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setOnsale((oldArray) => [...oldArray, product]);
        });

        const bestsellerFilter = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].bestseller === true;
        });

        bestsellerFilter.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setBestseller((oldArray) => [...oldArray, product]);
        });

        const featuredFilter = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].featured === true;
        });

        featuredFilter.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setFeatured((oldArray) => [...oldArray, product]);
        });

        const trendingFilter = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].trending === true;
        });

        trendingFilter.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.productID = item;
          setTrending((oldArray) => [...oldArray, product]);
        });
      });
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
            prodcuts={bestseller}
          />
          <ProductsList entitle="On Sale" artitle="للبيع" prodcuts={onsale} />
          <ProductsSet
            featuredProducts={featured}
            trendingProducts={trending}
          />
          <Testimonial testimonials={testimonial} />
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
