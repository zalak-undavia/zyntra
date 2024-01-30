import "./Home.css";
import Catagory from "../Category/Category.js";
import Carousel from "../Carousel/Carousel.js";
import Footer from "../Footer/Footer.js";
import Products from "../Products/Products.js";

export default function Home() {
  return (
    <div>
      <div className="main-container">
        <div className="content-bar">
          <Catagory />
          <Carousel />
          <div className="title-shop-by-category">
            &#127804; SHOP BY Category &#127804;
          </div>
          <Products />
        </div>
        <Footer />
      </div>
    </div>
  );
}
