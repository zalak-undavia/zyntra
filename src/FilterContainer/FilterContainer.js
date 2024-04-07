import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./FilterContainer.css";

export default function FilterContainer({ productNameCategory }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [checkInput, setCheckInput] = useState([]);
    const [checkIpForDiscount, setCheckInputForDiscount] = useState([]);
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    // min-max
    const initialMin = searchParams.get("minimumPrice")
        ? searchParams.get("minimumPrice")
        : "";
    const initialMax = searchParams.get("maximumPrice")
        ? searchParams.get("maximumPrice")
        : "";

    const [minInput, setMinInput] = useState(initialMin);
    const [maxInput, setMaxInput] = useState(initialMax);

    const goBtnFun = () => {
        const updatedSearchParams = new URLSearchParams(
            searchParams.toString()
        );

        updatedSearchParams.set("minimumPrice", minInput);
        updatedSearchParams.set("maximumPrice", maxInput);
        updatedSearchParams.set("filter", true);

        setSearchParams(updatedSearchParams.toString());
    };

    const a = productNameCategory.map(
        (v) => v.price - (v.price * v.discountPercentage) / 100
    );
    const discountRange = productNameCategory.map((v) => v.discountPercentage);

    // brands

    const getBrand = productNameCategory.map((v) => v.brand);
    const uniqueBrands = [...new Set(getBrand)];

    const checkboxOnchange = (index, value) => {
        checkInput[index] = !checkInput[index];
        setCheckInput([...checkInput]);
        const emptyArr = [];
        const searchParamForBrands = new URLSearchParams(
            searchParams.toString()
        );

        const branndsInUrl = searchParams.get("brands");
        console.log("branndsInUrl", branndsInUrl);

        // when there is no brand-
        if (!branndsInUrl) {
            searchParamForBrands.set("brand", [value]);
            setSearchParams(searchParamForBrands.toString());
        } else {
            // if there is already a brand
            console.log("type of brands in url", typeof branndsInUrl);
            emptyArr.push(branndsInUrl);
            console.log("empty-arr", emptyArr);
            searchParamForBrands.set("BRANDS", emptyArr);
            setSearchParams(searchParamForBrands.toString());
        }
    };

    // rating

    const getStars = (n) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < n) {
                stars.push(
                    <i className="bi bi-star-fill filter-star star-green" />
                );
            } else {
                stars.push(<i className="bi bi-star filter-star" />);
            }
        }

        return stars;
    };

    const getNumOfStar = searchParams.get("minStar");
    const applyStarRating = (n) => {
        // aavu tyare karo jyare badha j queryupdatedSearchParams ne kadhi ne aapdo ek j query param rakhvo hoi to
        // setSearchParams("minRating=4");
        // badha jupdatedSearchParams kadhva mate
        // setSearchParams("");
        // constupdatedSearchParams = new URLSearchParams(searchParams.toString());
        // updatedSearchParams.set("minRating", n);
        // setSearchParams(updatedSearchParams.toString());

        const searchParamForStar = new URLSearchParams(searchParams.toString());

        searchParamForStar.set("minStar", n);

        setSearchParams(searchParamForStar.toString());
    };

    // for Discount range nu onchange=
    const changeIpForDiscount = (j) => {
        const updatedSearchParamsForDis = new URLSearchParams(
            searchParams.toString()
        );
        updatedSearchParamsForDis.set("discount", 10 * (j + 1));
        setSearchParams(updatedSearchParamsForDis.toString());
    };

    const getRangeOfDiscount = () => {
        const arr = [];
        const getValue = searchParams.get("discount");
        let j = 0;

        for (let i = 10; i <= 80; i = i + 10) {
            arr.push(
                <div className="discount-range font-size-in-filter-section">
                    <input
                        type="checkbox"
                        checked={checkIpForDiscount[i]}
                        onChange={() => changeIpForDiscount(j)}
                        className="check-discount"
                    />
                    {`${i} % and above`}
                </div>
            );
            j = j + 1;
        }
        return <div>{arr}</div>;
    };

    console.log("checkipfordiscount ", checkIpForDiscount);
    // main-container
    return (
        <div className="all-filter-category">
            <div className="filter-section">
                <div className="filter-text">FILTERS</div>
                <div className="clear-all">CLEAR ALL</div>
            </div>
            <div className="price-filter-section">
                <h4>PRICE</h4>

                <div className="min-max-value-details">
                    <div className="min-text">Min : {Math.min(...a)}</div>
                    <div>Max : {Math.max(...a)}</div>
                </div>
                <div className="input-section-filter">
                    <input
                        value={minInput}
                        onChange={(e) => setMinInput(e.target.value)}
                        type="text"
                        className="input-of-min"
                        placeholder=" Rs Min"
                    ></input>
                    <input
                        value={maxInput}
                        className="input-of-max"
                        onChange={(e) => setMaxInput(e.target.value)}
                        type="text"
                        placeholder="Rs Max"
                    ></input>
                </div>

                <div className="go-btn-filter" onClick={() => goBtnFun()}>
                    Go
                </div>
            </div>
            <div className="border-class-filter"></div>
            <div className="brand-filter-section">
                <div>
                    <h4>BRAND</h4>
                    <div>
                        <div>
                            {uniqueBrands.map((v, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="single-brand-in-filter-section font-size-in-filter-section"
                                    >
                                        <input
                                            className="checkbox-input-filter"
                                            type="checkbox"
                                            value={checkInput[i]}
                                            onChange={() =>
                                                checkboxOnchange(i, v)
                                            }
                                        ></input>
                                        <div className="brand">{v}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-class-filter"></div>
            <div className="rating-filter-section">
                <h4 className="h4-rating">RATING</h4>
                <div className="font-size-in-filter-section">
                    <div
                        className={`${
                            getNumOfStar == 4
                                ? "selected-star"
                                : "single-rating "
                        }`}
                        onClick={() => applyStarRating(4)}
                    >
                        {getStars(4)} & above
                    </div>
                    <div
                        className={`${
                            getNumOfStar == 3
                                ? "selected-star"
                                : "single-rating "
                        }`}
                        onClick={() => applyStarRating(3)}
                    >
                        {getStars(3)} & above
                    </div>
                    <div
                        className={`${
                            getNumOfStar == 2
                                ? "selected-star"
                                : "single-rating "
                        }`}
                        onClick={() => applyStarRating(2)}
                    >
                        {getStars(2)} & above
                    </div>
                    <div
                        className={`${
                            getNumOfStar == 1
                                ? "selected-star"
                                : "single-rating "
                        }`}
                        onClick={() => applyStarRating(1)}
                    >
                        {getStars(1)} & above
                    </div>
                </div>
            </div>
            <div className="border-class-filter"></div>
            <div className="discount-filter-section">
                <h4>DISCOUNT RANGE</h4>
                <div>{getRangeOfDiscount()}</div>
            </div>
        </div>
    );
}

// localhost:3000/selectedCategory?productCategory=skincare&min=10
// localhost:3000/selectedCategory/skincare?min=10
// "selectedCategory/:id"

// filter kai vastu ma

// 1.discount percentage
// 2.rating
// 3.BRABD

// note =
//

// push no use krvo hoi to state ma nalhvu pade...
// state ma nhi nalkhe to

// setCheckInput((currentCheckInput) => {
//     currentCheckInput[index] = !currentCheckInput[index];
//     return [...currentCheckInput];
// });

// if (!branndsInUrl) {
//     // we are adding the brand for the first time
//     // there were no brands added to the filter before
//     updatedSearchParams.set("brands", JSON.stringify([value]));
// } else {
//     // this is not the first time that we are adding the brand
//     // there already might be some brands in the array
//     const arr = JSON.parse(branndsInUrl);

//     if (checkInput[index]) {
//         // jyare untik kris tyare aa
//         // the current value is true, meaning that it would be false in the future
//         // meaning that the brand is already presentin the url and we need to remove it
//         const idx = arr.findIndex((v) => v === value);
//         arr.splice(idx, 1);
//         if (arr.length === 0) {
//             updatedSearchParams.delete("brands");
//         } else {
//             updatedSearchParams.set("brands", JSON.stringify(arr));
//         }
//     } else {
//         // jyare tik kris tyare aa
//         // the curent value is false. the brand is not in the url
//         // we need to add the brand in the url
//         arr.push(value);
//         updatedSearchParams.set("brands", JSON.stringify(arr));
//     }
// }

// setSearchParams(updatedSearchParams.toString());
// console.log("branndsInUrl", branndsInUrl);

// anand ne puchvanu=
// const changeIpForDiscount = (j) => {
//     const updatedSearchParamsForDis = new URLSearchParams(
//         searchParams.toString()
//     );
//     updatedSearchParamsForDis.set("discount", 10 * (j + 1));
//     setSearchParams(updatedSearchParamsForDis.toString());
// };
// const getRangeOfDiscount = () => {
//     const arr = [];
//     const getValue = searchParams.get("discount");

//     for (let i = 10, j = 0; i <= 80; i = i + 10, j++) {
//         arr.push(
//             <div>
//                 {" "}
//                 <input
//                     type="checkbox"
//                     checked={checkIpForDiscount[i]}
//                     onChange={() => changeIpForDiscount(j)}
//                     className="check-discount"
//                 />
//                 {`${i} % and above`}
//             </div>
//         );
//     }
//     return <div>{arr}</div>;
// };
