import { useEffect, useState } from "react";
import "./IndividualProduct.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import { useAuth } from "../auth.js";

import Button from "react-bootstrap/Button";
import { HeadcontextInHeader } from "../HeaderContext";

export default function IndividualProduct() {
    const [data, setdata] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const contextValue = HeadcontextInHeader();
    const nav = useNavigate();
    const productId = searchParams.get("individualProduct");
    const auth = useAuth();

    useEffect(() => {
        const asyncFun = async () => {
            try {
                const request = await fetch(
                    `https://dummyjson.com/products/${productId}`
                );
                const response = await request.json();

                setdata(response);
            } catch (e) {
                console.log("e", e);
            }
        };

        asyncFun();
    }, [productId]);

    const goToBag = () => {
        if (!auth.userName) {
            nav("/profile");
        }
        const getItemForBag = JSON.parse(
            localStorage.getItem("bagArray") || "[]"
        );

        const dataToPush = { ...data };
        dataToPush.qty = 1;
        getItemForBag.push(dataToPush);
        contextValue.calculateProduct();

        localStorage.setItem("bagArray", JSON.stringify(getItemForBag));
        setdata({ ...data });
    };
    const wishlistBtnFun = () => {
        const getItem = JSON.parse(localStorage.getItem("wishProduct") || "[]");
        getItem.push(data);
        localStorage.setItem("wishProduct", JSON.stringify(getItem));
        // dummy set state to force a rerender
        setdata({ ...data });
    };

    //   If product is added in whishList.
    // If yes then change clr of wishlist btn-
    const getItem = JSON.parse(localStorage.getItem("wishProduct") || "[]");
    const isProductAddedInWishList = getItem.find(
        (element) => element.id == productId
    );

    //   if product is added in bag=
    const getItemInBag = JSON.parse(localStorage.getItem("bagArray") || "[]");
    const isItemAddedInBag = getItemInBag.find((v) => v.id == productId);

    const leftContainer = () => {
        if (!data) return;
        return (
            <div className="product-image-container">
                {data.images.map((v, idx) => (
                    <div className="single-product-image" key={idx}>
                        <Card>
                            <Card.Img src={v} />
                        </Card>
                    </div>
                ))}
            </div>
        );
    };

    const rightContainer = () => {
        return (
            <>
                <div className="title-individual ">{data.title}</div>
                <div className="discription-single-product-individual padding-bottom-individual-product">
                    {data.description}.
                </div>
                {data.brand !== undefined && (
                    <div className="brand-single-product-individual padding-bottom-individual-product">
                        <span className="bold-fonts-individual">Brand </span>:
                        <span> {data.brand}</span>
                    </div>
                )}

                <div className="rating-box-single-product-individual padding-bottom-individual-product">
                    <span>{data.rating}</span>
                    <i className="bi bi-star-fill star-individual"></i>
                    <span className="single-line-individual">|</span>
                    <span>{data.title.length} Ratings</span>
                </div>
                <div className="price-section-individual padding-bottom-individual-product">
                    <span className="bold-fonts-individual ">Price </span>: Rs
                    <span className="margin-class">
                        {Math.round(
                            data.price -
                                (data.price * data.discountPercentage) / 100
                        )}
                    </span>
                    <span>
                        <span className="mrp-margin-class">MRP</span>:
                        <span className="original-price-class">
                            {" "}
                            Rs {data.price}
                        </span>
                        ({data.discountPercentage} % OFF)
                        <br />{" "}
                    </span>
                    <div className="tax-on-product">inclusive of all taxes</div>
                </div>
                <div className="btn-section-single-product padding-bottom-individual-product ">
                    <Button
                        className="btn-individual-product add-in-bag"
                        onClick={isItemAddedInBag ? undefined : () => goToBag()}
                        variant={isItemAddedInBag ? "secondary" : "dark"}
                    >
                        <i className="bi bi-bag-heart-fill h-icon-indi"></i>
                        {isItemAddedInBag ? "Added in Bag" : "Add to Bag"}
                    </Button>
                    <Button
                        className="btn-individual-product"
                        variant={
                            isProductAddedInWishList
                                ? "outline-secondary"
                                : "outline-dark"
                        }
                        onClick={
                            isProductAddedInWishList
                                ? undefined
                                : () => wishlistBtnFun(data.id)
                        }
                    >
                        <i
                            className={` bi bi-heart-fill h-icon-indi ${
                                isProductAddedInWishList
                                    ? "heart-individual"
                                    : ""
                            }`}
                        ></i>
                        {isProductAddedInWishList ? "Wishlisted" : "Wishlist"}
                    </Button>
                </div>
            </>
        );
    };

    if (!data) return;

    const hedearCategory =
        data.category.slice(0, 1).toUpperCase() + data.category.slice(1);

    const getPath = () => {
        return (
            <Breadcrumb className="z-breadcrumb">
                <Breadcrumb.Item onClick={() => nav("/")}>Home</Breadcrumb.Item>
                <Breadcrumb.Item
                    onClick={() => nav(`/selectedCategory/${data.category}`)}
                >
                    {data.category}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{data.title}</Breadcrumb.Item>
            </Breadcrumb>
        );
    };
    return (
        <div className="product-detail-container">
            <div className="header-single-product ">
                <div className="path">{getPath()}</div>
            </div>
            <div className="detail-container">
                <div className="left-container-individual-product">
                    {leftContainer()}
                </div>
                <div className="right-conatiner-individual-product">
                    {rightContainer()}
                </div>
            </div>
        </div>
    );
}
