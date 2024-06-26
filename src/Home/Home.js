import "./Home.css";
import Carousel from "../Carousel/Carousel.js";
import Products from "../Products/Products.js";
import ImageBlock1 from "../ImageBlock1/ImageBlock1.js";
import ThreeBlockImg from "../ThreeBlockImg/ThreeBlockImg.js";
import Parallax from "../Parallax/Parallax.js";
import { useRef } from "react";

export default function Home() {
    const categoryRef = useRef();

    const onCarouselClick = () => {
        categoryRef.current.scrollIntoView();
    };

    return (
        <div>
            <div className="main-container">
                <div className="content-bar">
                    <Carousel onClick={onCarouselClick} />
                    <ImageBlock1 />
                    <div className="title-shop-by-category">
                        <div
                            ref={categoryRef}
                            className="title-shop-by-category-text"
                        >
                            Shop by category
                        </div>
                    </div>
                    <Products />
                    <Parallax />
                    <ThreeBlockImg />
                </div>
            </div>
        </div>
    );
}
