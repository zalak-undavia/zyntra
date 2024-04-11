import { useState } from "react";

import "./Bag.css";

import EmptyBag from "./EmptyBag";
import BagProducts from "./BagProducts";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

import { HeadcontextInHeader } from "../HeaderContext";

export default function Bag() {
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const [toggleToRefresh, setToggleToRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const getItemForBag = JSON.parse(localStorage.getItem("bagArray") || "[]");

    const contextValue = HeadcontextInHeader();

    const onQuantityUpdate = (qty, index) => {
        const items = JSON.parse(localStorage.getItem("bagArray") || "[]");
        items[index].qty = qty;
        localStorage.setItem("bagArray", JSON.stringify(items));
        setToggleToRefresh((t) => !t);
        contextValue.calculateProduct();
    };

    const renderAllBagProduct = () => {
        return (
            <div>
                {getItemForBag.map((v, i) => {
                    const x = (qty) => {
                        onQuantityUpdate(qty, i);
                    };
                    return (
                        <BagProducts
                            deleteFromBag={deleteFromBag}
                            v={v}
                            i={i}
                            onQtyChange={x}
                        />
                    );
                })}
            </div>
        );
    };
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const removeFromBag = () => {
        const index = modalData.index;
        const getItemForBag = JSON.parse(
            localStorage.getItem("bagArray") || "[]"
        );
        getItemForBag.splice(index, 1);
        localStorage.setItem("bagArray", JSON.stringify(getItemForBag));
        contextValue.calculateProduct();
        setToggleToRefresh(!toggleToRefresh);
        setModalData({});
        setShow(false);
    };

    const moveToWishList = () => {
        const index = modalData.index;
        const value = modalData.value;

        const wishlist = JSON.parse(
            localStorage.getItem("wishProduct") || "[]"
        );
        const getItemForBag = JSON.parse(
            localStorage.getItem("bagArray") || "[]"
        );

        const isProductInWishList = wishlist.find((item, itemIndex) => {
            return item.id == value.id;
        });

        !isProductInWishList && wishlist.push(value);

        getItemForBag.splice(index, 1);

        localStorage.setItem("bagArray", JSON.stringify(getItemForBag));
        localStorage.setItem("wishProduct", JSON.stringify(wishlist));

        contextValue.calculateProduct();
        setModalData({});
        setShow(false);
    };

    const deleteFromBag = (v, i) => {
        setModalData({ index: i, value: v, thumb: v.thumbnail });
        handleShow();
    };

    const renderModal = () => {
        return (
            <div>
                <>
                    <Modal centered show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Move from Bag</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ display: "flex" }}>
                            <img
                                className="thumbnail-in-modal"
                                src={modalData.thumb}
                            />
                            Are you sure you want to move this item from bag ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                style={{ borderRadius: "0.375rem" }}
                                variant="outline-dark"
                                onClick={() => removeFromBag()}
                            >
                                REMOVE
                            </Button>
                            <Button
                                style={{ borderRadius: "0.375rem" }}
                                variant="dark"
                                onClick={() => moveToWishList()}
                            >
                                MOVE TO WISHLIST
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        );
    };

    const RenderProductsDetailsInRightContainer = () => {
        const getItemForBag = JSON.parse(
            localStorage.getItem("bagArray") || "[]"
        );

        // Price
        const getPrice = getItemForBag.map((v) => v.price * v.qty);
        const MRP = getPrice.reduce((acc, currentValue) => {
            return acc + currentValue;
        }, 0);

        // discount
        const discount = (price, discountPercentage) => {
            return Math.round(price - (price * discountPercentage) / 100);
        };
        const discountCalculation = getItemForBag.map((value, index) => {
            return discount(value.price, value.discountPercentage) * value.qty;
        });

        const disOnCost = discountCalculation.reduce((acc, curV) => acc + curV);

        const discountOnMrp = MRP - disOnCost;
        const totalAmount = MRP - discountOnMrp + 20;

        const placeOrderFun = () => {
            setShowToast(true);
        };
        const closeToastFun = () => {
            setShowToast(false);
        };
        const renderToast = () => {
            return (
                <Toast
                    style={{
                        width: "350px",
                        height: "100px",
                        backgroundColor: "red",
                    }}
                    onClose={closeToastFun}
                >
                    <div>
                        <Toast.Header>
                            <strong className="me-auto"></strong>
                        </Toast.Header>
                        <Toast.Body style={{ width: "500px" }}>
                            THIS FUNCTIONALITY HAS NOT BEEN IMPLEMENTED
                        </Toast.Body>
                    </div>
                </Toast>
            );
        };
        return (
            <div>
                <div className="price-details">
                    <div className="price-details-header-fonts">
                        <div className="margin-class-for-price-details ">
                            PRICE DETAILS
                        </div>
                        <span>
                            ({getItemForBag.length}
                            <span className="margin-class-for-price-details "></span>
                            {getItemForBag.length > 1 ? "Items" : "Item"})
                        </span>
                    </div>
                    <div className="mrp-section">
                        Total MRP <span className="mrp">Rs {MRP}</span>
                    </div>
                    <div className="discount-on-mrp">
                        Discount on MRP
                        <span style={{ color: "green" }}>
                            - Rs {discountOnMrp}
                        </span>
                    </div>
                    <div className="platform-fee-section">
                        Platform Fee <span>Rs 20</span>
                    </div>
                    <div className="shipiing-free">
                        Shipping Fee <span>Free</span>
                    </div>
                    <div className="free-shipping-for-you">
                        Free Shipping for you
                    </div>
                    <div className="single-line"></div>
                    <div className="total-amount">
                        Total Amount <span>{totalAmount}</span>
                    </div>
                    <button
                        onClick={() => placeOrderFun()}
                        className="place-order-btn"
                    >
                        PLACE ORDER
                    </button>
                    <div
                        className={`toast-place-order ${
                            showToast ? "toast-pop-up" : ""
                        }`}
                    >
                        {renderToast()}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div>
            {getItemForBag.length == 0 ? (
                <EmptyBag />
            ) : (
                <div>
                    <div>{renderModal()}</div>
                    <div className="bag-section-bag-page">
                        <div className="bag-section-bag-page__single-child">
                            <div className="left-container-bag-page">
                                {renderAllBagProduct()}
                            </div>
                            <div className="right-container-bag-page">
                                {RenderProductsDetailsInRightContainer()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
