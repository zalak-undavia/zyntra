import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";
import EmptyWishList from "./EmptyWishList";
import { HeadcontextInHeader } from "../HeaderContext";

export default function Wishlist() {
    const [_, setPageRefreshState] = useState({});
    const wishlist = JSON.parse(localStorage.getItem("wishProduct") || "[]");
    const contextValue = HeadcontextInHeader();
    const discount = (price, discountPercentage) => {
        return Math.round(price - (price * discountPercentage) / 100);
    };

    const nav = useNavigate();
    const goToIndividualProduct = (id) => {
        nav(`/product?individualProduct=${id}`);
    };

    const deleteProduct = (index) => {
        const wishlist = JSON.parse(
            localStorage.getItem("wishProduct") || "[]"
        );
        wishlist.splice(index, 1);
        localStorage.setItem("wishProduct", JSON.stringify(wishlist));
        setPageRefreshState({});
    };

    const deletefromWishList = (index) => {
        return deleteProduct(index);
    };

    const goToBagFun = (v, index) => {
        deleteProduct(index);
        const getItemForBag = JSON.parse(
            localStorage.getItem("bagArray") || "[]"
        );

        const isObjFound = getItemForBag.find((item, itemIndex) => {
            return item.id == v.id;
        });

        if (!isObjFound) {
            const itemToPush = { ...v, qty: 1 };
            getItemForBag.push(itemToPush);
        }
        localStorage.setItem("bagArray", JSON.stringify(getItemForBag));
        setPageRefreshState({});
        contextValue.calculateProduct();
    };

    const calcItem = () => {
        return (
            <div className="wish-header">
                <div className="wish-heder-text">{` My wishlist has  ${
                    wishlist.length
                } ${wishlist.length > 1 ? "items" : "item"} !`}</div>
            </div>
        );
    };

    return (
        <div>
            {wishlist.length == 0 ? (
                <EmptyWishList />
            ) : (
                <div>
                    <div className="nums-of-products-in-wishlist">
                        {calcItem()}
                    </div>

                    <div className="single-category-container-wish">
                        <div className="inside-wish-container ">
                            {wishlist.map((v, idx) => (
                                // <Col key={idx}>
                                <Card className="wishlist-card-style-z">
                                    <Card.Img
                                        onClick={() =>
                                            goToIndividualProduct(v.id)
                                        }
                                        className="card-img single-category-card-img curser"
                                        variant="top"
                                        src={v.thumbnail}
                                    />
                                    <div className="rating-box">
                                        {v.rating}
                                        <span>
                                            <i class="bi bi-star-fill star-icon-category-list"></i>
                                        </span>
                                        <span
                                            style={{
                                                marginRight: "10px",
                                            }}
                                        >
                                            |
                                        </span>
                                        <span>{v.title.length}</span>
                                    </div>

                                    <button
                                        onClick={() => deletefromWishList(idx)}
                                    >
                                        <i class="bi bi-x wish-close-btn"></i>
                                    </button>

                                    <Card.Body className="card-body">
                                        <Card.Title className="wish-category-name">
                                            {v.title}
                                        </Card.Title>
                                        <Card.Text className="shop-now">
                                            {v.brand}
                                        </Card.Text>
                                        <Card.Text className="shop-now">
                                            Price : Rs{" "}
                                            {discount(
                                                v.price,
                                                v.discountPercentage
                                            )}
                                            <span
                                                style={{
                                                    textDecoration:
                                                        "line-through",
                                                    color: "gray",
                                                    marginLeft: "15px",
                                                }}
                                            >
                                                {v.price}
                                            </span>
                                            <span style={{ color: "red" }}>
                                                ({v.discountPercentage} % OFF)
                                            </span>
                                        </Card.Text>
                                    </Card.Body>

                                    <div
                                        onClick={() => goToBagFun(v, idx)}
                                        className="move-to-bag-btn"
                                    >
                                        MOVE TO BAG
                                    </div>
                                </Card>
                                // </Col>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
