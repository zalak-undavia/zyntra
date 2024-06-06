import { useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ onClick }) {
    const [imageIndex, setImageIndex] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1519748771451-a94c596fad67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://www.diffeyewear.com/cdn/shop/articles/2022-DIFF-Web-Collection-Banner-Fall-New-Arrivals-1242x630_1024x1024.jpg?v=1666971266",
        "https://images.unsplash.com/photo-1571599164516-bacd34e651f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1652911942944-572e532c8cf2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const pereviousBtn = () => {
        setImageIndex((currentValue) => {
            if (currentValue <= 0) {
                return images.length - 1;
            } else {
                return currentValue - 1;
            }
        });
    };

    const nextBtn = () => {
        setImageIndex((currentValue) => {
            if (currentValue >= images.length - 1) {
                return 0;
            } else {
                return currentValue + 1;
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextBtn();
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const carouselShopNow = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="caro-main-box">
            <div className="carousel-container">
                <button
                    onClick={() => pereviousBtn()}
                    className="left-slide-btn"
                >
                    <i className="bi bi-chevron-compact-left"></i>
                </button>
                <div className="text-on-carousel">
                    <span className="lestest-trend-text">
                        LATEST <span style={{ marginLeft: "5px" }}>TRENDS</span>
                    </span>{" "}
                    <br />
                    <span className="free-shipping-detail">
                        Free shipping on every product
                    </span>
                    <br />
                    <span className="only-on-zyntra"> Only on Zyntra</span>
                    <button
                        onClick={() => carouselShopNow()}
                        className="shop-now-carousel"
                    >
                        SHOP NOW
                    </button>
                </div>
                <div
                    className="image"
                    style={{
                        backgroundImage: `url(${images[imageIndex]})`,
                    }}
                />
                <button onClick={() => nextBtn()} className="right-slide-btn">
                    <i className="bi bi-chevron-compact-right"></i>
                </button>
            </div>
        </div>
    );
}
