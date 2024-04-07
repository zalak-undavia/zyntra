import { useState, useEffect } from "react";
import "./HeaderBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { HeadcontextInHeader } from "../HeaderContext";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../auth.js";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function HeaderBar() {
    const nav = useNavigate();
    const auth = useAuth();
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [isLogOut, setIsLogOut] = useState(false);

    const changeToProfilePage = () => nav("/profile");
    const changeToWishListPage = () => nav("/wishlist");
    const changeToBag = () => nav("/bag");

    HeadcontextInHeader();
    //   aa page ne refresh karva mate lakhu che

    //   array acess kryo
    const getArrOfTotalProduct = JSON.parse(
        localStorage.getItem("bagArray") || "[]"
    );

    //   arra ni qty no sarvalo karyo array mathi
    const totalProductCount = getArrOfTotalProduct.reduce((acc, currentV) => {
        return acc + currentV.qty;
    }, 0);

    //   aa sarvala ne contaext thi pass karyo

    const goToHomePage = () => {
        nav("/");
    };

    const onSubmitSearch = async (e) => {
        e.preventDefault();

        if (inputValue == "" || data.length == 0) {
            setOpenDropDown(false);
        } else {
            setOpenDropDown(true);
        }

        try {
            const request = await fetch(
                `https://dummyjson.com/products/search?q=${inputValue}`
            );
            const response = await request.json();

            setData(response.products);
        } catch (e) {
            console.log("error", e);
        }
    };

    const togglefun = (a) => {
        setOpenDropDown(a);
        setInputValue("");
    };

    const goToIndividualProduct = (v) => {
        setOpenDropDown(false);
        setInputValue("");
        nav(`/product?individualProduct=${v.id}`);
    };

    const drowpDownDataRender = () => {
        return (
            <Dropdown
                onToggle={(a) => togglefun(a)}
                show={openDropDown}
                autoClose="outside"
            >
                <Dropdown.Menu className="main-box-dropdown">
                    {data.map((v, i) => {
                        return (
                            <Dropdown.Item key={i}>
                                <div>
                                    <div
                                        className="single-product-in-search-dropdown"
                                        onClick={() => goToIndividualProduct(v)}
                                    >
                                        <img
                                            className="serach-drop-down-img"
                                            src={v.thumbnail}
                                        />
                                        <div>{v.title}</div>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const searchInputOnchangeFun = (e) => {
        if (e.target.value == "") {
            setOpenDropDown(false);
        }
        setInputValue(e.target.value);
    };

    const userLogOutFun = () => {
        nav("/profile");
        auth.logOutFun("");
    };

    const conformLogOut = () => {
        setIsLogOut(!isLogOut);
    };
    const userLoggedInTag = () => {
        const nameArr = auth.userName
            .split(" ")
            .map((v) => v[0].toUpperCase())
            .filter((v, i) => {
                return i < 2;
            })
            .join("");
        //   <div
        //     onClick={() => conformLogOut()}
        //
        //   >
        //
        //   </div>
        return (
            <div className="profile-sec">
                <Dropdown>
                    <Dropdown.Toggle
                        variant="default"
                        className="user-name"
                        id="dropdown-basic"
                    >
                        {nameArr}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="z">
                        <Dropdown.Item onClick={() => userLogOutFun()}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    };
    return (
        <div>
            <div className="header-bar">
                <h1
                    onClick={() => goToHomePage()}
                    className="name-of-app header-left"
                >
                    Zyntra
                </h1>

                <div className="input-sec">
                    <form
                        id="dropdown-basic"
                        onSubmit={(e) => onSubmitSearch(e)}
                    >
                        <InputGroup className="input-header-z">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            </InputGroup.Text>
                            <Form.Control
                                className="input-fonts"
                                placeholder="Search on zyntra"
                                value={inputValue}
                                onChange={(e) => searchInputOnchangeFun(e)}
                                // aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </form>
                </div>

                <div className="header-right">
                    {auth.userName ? (
                        userLoggedInTag()
                    ) : (
                        <div
                            title="Login"
                            onClick={() => changeToProfilePage()}
                            className="profile-sec"
                        >
                            <FontAwesomeIcon
                                className="profile-icon"
                                icon="fa-solid fa-user"
                            />
                        </div>
                    )}

                    <div
                        title="Wishlist"
                        onClick={() => changeToWishListPage()}
                        className="wishlist-section"
                    >
                        <div>
                            <FontAwesomeIcon
                                className="whishlist-icon"
                                icon="fa-solid fa-heart"
                            />
                        </div>
                    </div>
                    <div
                        title="Bag"
                        onClick={() => changeToBag()}
                        className="bag-section position-relative"
                    >
                        <div>
                            <FontAwesomeIcon
                                className="bag-icon-header"
                                icon="fa-solid fa-bag-shopping"
                            />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {auth.userName &&
                                    totalProductCount > 0 &&
                                    totalProductCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-dropdown-container">
                {data.length > 0 && drowpDownDataRender()}
            </div>

            {isLogOut && (
                <button onClick={() => userLogOutFun()} className="logout">
                    logout
                </button>
            )}
        </div>
    );
}

// que
// 1 . olu serch icon ma input bar ma postion relative
// nd search icon ma absoltue aapu chu to km nathi chaltu?

// 2.placeholder ma aavi rite space mukia to chale?
// ans= padding-left aapvathi
