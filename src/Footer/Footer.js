import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    const [data, setData] = useState([]);
    const nav = useNavigate();

    const categoryBar = [
        "smartphones & laptops ",
        "men",
        "women",
        "skincare",
        "fragrances",
        "Sunglasses",
        "groceries",
        "Home-decoration",
        "Furniture",
        "Automotive & Motorcycle",
        "Lighting",
    ];

    useEffect(() => {
        const asyncFun = async () => {
            try {
                const request = await fetch(
                    "https://dummyjson.com/products?limit=3000"
                );
                const response = await request.json();
                setData(response.products);
            } catch (e) {
                console.log("error", e);
            }
        };

        asyncFun();
    }, []);
    // console.log("data in footer", data);
    const popularSearchSection = () => {
        const nonReapeatBrand = data.map((v, i) => {
            return v.brand;
        });

        const newBrandsArr = [...new Set(nonReapeatBrand)];

        const goTocategory = (value) => {
            window.scroll(0, 0);

            const getId = data.find((v) => {
                return v.brand == value;
            });

            nav(`/selectedCategory/${getId.category}?brands=${value}`);
        };

        const popularSearchItems = () => {
            return (
                <div className="all-brands-in-linein-footer">
                    {newBrandsArr.map((v, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => goTocategory(v)}
                                className="product-name-in-footer"
                            >
                                {v} |
                            </div>
                        );
                    })}{" "}
                </div>
            );
        };
        return (
            <div>
                <div className="popular-searches">
                    <span
                        className="pop-text"
                        style={{ fontSize: "22px", fontWeight: "bold" }}
                    >
                        POPULAR SEARCHES
                    </span>
                    <div className="all-brands-in-footer">
                        {popularSearchItems()}
                    </div>
                </div>
            </div>
        );
    };

    const footerEnd = () => {
        return (
            <div className="footer-end">
                © 2024 www.Zyntra.com. All rights reserved.
            </div>
        );
    };

    const onlineShoppingFun = () => {
        return (
            <div className="online-shopping-main-conatiner">
                <div className="online-shopping">ONLINE SHOPPING</div>
                <div>
                    {categoryBar.map((v, i) => (
                        <div key={i} className="list-of-products-in-footer">
                            {v.slice(0, 1).toUpperCase() + v.slice(1)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const keepInTouchFun = () => {
        return (
            <div>
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "22px",
                        marginTop: "30px",
                    }}
                >
                    EXPERIENCE ZYNTRA APP ON MOBILE
                </div>
                <div className="buttons-in-footer">
                    <div className="play-store-btn-ff"></div>
                    <div className="app-store-btn"></div>
                </div>
                <div style={{ fontWeight: "bold", marginTop: "50px" }}>
                    KEEP IN TOUCH
                </div>
                <div className="footer-icons-container">
                    <i className="bi bi-facebook common-class"></i>
                    <i className="bi bi-twitter common-class"></i>
                    <i className="bi bi-youtube common-class"></i>
                    <i className="bi bi-instagram common-class"></i>
                </div>
            </div>
        );
    };
    const freeDelivery = () => {
        return (
            <div>
                <div className="main-container-free-delivery">
                    <div className="first-sec-free-delivery">
                        <img
                            className="footer-delivery-img-1"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcvcpos87HinX8QEBYAb7E_IrKDD8D20jQwQ&usqp=CAU"
                        ></img>
                        <div style={{ alignSelf: "center" }}>
                            <span style={{ fontWeight: "bold" }}>
                                100% ORIGINAL guarantee{" "}
                            </span>
                            for <br /> all products at Zyntra.com
                        </div>
                    </div>

                    <div className="sec-section-free-delivery">
                        <img
                            className="footer-delivery-img-2"
                            src="https://cdn.shopify.com/s/files/1/0299/8563/6396/files/14dayreturns_240x240.jpg?v=1612703450"
                        ></img>
                        <div style={{ alignSelf: "center" }}>
                            <span style={{ fontWeight: "bold" }}>
                                {" "}
                                Return within <br /> 14days{" "}
                            </span>
                            of receiving your order
                        </div>
                    </div>

                    <div className="third-section-free-delivery">
                        <img
                            className="footer-delivery-img-3"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9axebz3YDIkci_iDufm5qEe6gsaSB3ZfdN7C9BMspXdiNKGUeOMyiRI5Iaza6g_kD8Ts&usqp=CAU"
                        ></img>
                        <div style={{ alignSelf: "center" }}>
                            <span style={{ fontWeight: "bold" }}>
                                Get free delivery{" "}
                            </span>
                            on
                            <br />
                            every order !
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="footer">
            <div className="footer-main-content">
                <div className="upper-footer-container">
                    <div className="online-main-container">
                        {onlineShoppingFun()}
                    </div>
                    <div className="keep-in-touch-conatiner">
                        {keepInTouchFun()}
                    </div>
                    <div className="free-delivery-section">
                        {freeDelivery()}
                    </div>
                </div>
                <div>{popularSearchSection()}</div>
                <div>{footerEnd()}</div>
            </div>
        </div>
    );
}
