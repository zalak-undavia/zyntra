import { useState } from "react";
import "./FilterNew.css";
import { useSearchParams } from "react-router-dom";

const exists = (str1, str2) => {
    const result = str1.split(",");
    if (result.includes(str2)) {
        return true;
    } else {
        return false;
    }
};

export default function FilterNew({ productNameCategory }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const minValueFromUrl = searchParams.get("min") || "";
    const maxValueFromUrl = searchParams.get("max") || "";
    const [minInputForPrice, setMinInputForPrice] = useState(minValueFromUrl);
    const [maxInputForPrice, setMaxInputForPrice] = useState(maxValueFromUrl);

    const clearAllFilterData = () => {
        setSearchParams("");
        setMinInputForPrice("");
        setMaxInputForPrice("");
    };
    const renderPrice = () => {
        const discount = (price, discountPercentage) => {
            return Math.round(price - (price * discountPercentage) / 100);
        };

        const discountedPriceArr = productNameCategory.map((v) =>
            discount(v.price, v.discountPercentage)
        );

        const minValue = Math.min(...discountedPriceArr);
        const maxValue = Math.max(...discountedPriceArr);

        const gobtnPriceFilter = (e) => {
            e.preventDefault();
            const urlParamsForPrice = new URLSearchParams(
                searchParams.toString()
            );

            urlParamsForPrice.set("min", minInputForPrice);
            urlParamsForPrice.set("max", maxInputForPrice);
            setSearchParams(urlParamsForPrice.toString());
        };
        return (
            <div className="price-filter-section ">
                <h3>PRICE</h3>
                <form onSubmit={(e) => gobtnPriceFilter(e)}>
                    <div className="min-max-value-details font-size-in-filter-section">
                        <div>Min : {minValue}</div>
                        <div>Max : {maxValue}</div>
                    </div>
                    <div className="input-section-filter">
                        <input
                            placeholder="min-value"
                            type="number"
                            value={minInputForPrice}
                            onChange={(e) =>
                                setMinInputForPrice(e.target.value)
                            }
                            className="input-of-min"
                        ></input>
                        <input
                            value={maxInputForPrice}
                            onChange={(e) =>
                                setMaxInputForPrice(e.target.value)
                            }
                            placeholder="max-value"
                            className="input-of-max"
                        ></input>
                    </div>
                    <button className="go-btn-filter">GO</button>
                </form>
            </div>
        );
    };

    const renderBrands = () => {
        const uniqueBrands = Array.from(
            new Set(
                productNameCategory.filter((t) => t.brand).map((t) => t.brand)
            )
        );
        const totalBrands = searchParams.get("brands") || "";

        const onchangeForBrands = (brandName) => {
            const shouldRemove = exists(totalBrands, brandName);
            const existingBrands = totalBrands.split(",");
            const params = new URLSearchParams(searchParams.toString());

            if (shouldRemove) {
                existingBrands.splice(existingBrands.indexOf(brandName), 1);
                if (existingBrands.length === 0) {
                    params.delete("brands");
                } else {
                    params.set("brands", existingBrands.join(","));
                }
            } else {
                if (totalBrands.length == 0) {
                    params.set("brands", brandName);
                } else {
                    existingBrands.push(brandName);
                    params.set("brands", existingBrands.join(","));
                }
            }

            setSearchParams(params.toString());
        };

        if (uniqueBrands.length === 0) {
            return;
        }
        return (
            <>
                <div className="brand-filter-section">
                    <h3>BRAND</h3>

                    <div>
                        {uniqueBrands.map((v, i) => {
                            return (
                                <div
                                    key={i}
                                    className="single-brand-in-filter-section font-size-in-filter-section "
                                >
                                    <input
                                        checked={exists(totalBrands, v)}
                                        onChange={() => onchangeForBrands(v, i)}
                                        className="checkbox-input-filter"
                                        type="checkbox"
                                    ></input>
                                    <div className="brand">{v}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    };

    const randerRatings = () => {
        const getStarFromUrl = searchParams.get("ratings");

        const selectStarForFilter = (n) => {
            const getNumOfStar = new URLSearchParams(searchParams.toString());
            getNumOfStar.set("ratings", n);
            setSearchParams(getNumOfStar.toString());
        };

        const renderStar = (n) => {
            const arr = [];
            for (let i = 0; i < 5; i++) {
                if (i < n) {
                    arr.push(
                        <i className="bi bi-star-fill star-green filter-star"></i>
                    );
                } else {
                    arr.push(<i className="bi bi-star filter-star"></i>);
                }
            }
            return arr;
        };
        return (
            <div className="rating-filter-section">
                <h3>RATING</h3>
                <div className="font-size-in-filter-section">
                    <div
                        onClick={() => selectStarForFilter(4)}
                        className={
                            getStarFromUrl == 4
                                ? "single-rating active-star-row"
                                : "single-rating"
                        }
                    >
                        {renderStar(4)} & above
                    </div>
                    <div
                        onClick={() => selectStarForFilter(3)}
                        className={
                            getStarFromUrl == 3
                                ? "single-rating active-star-row"
                                : "single-rating"
                        }
                    >
                        {renderStar(3)} & above
                    </div>
                    <div
                        onClick={() => selectStarForFilter(2)}
                        className={
                            getStarFromUrl == 2
                                ? "single-rating active-star-row"
                                : "single-rating"
                        }
                    >
                        {renderStar(2)} & above
                    </div>
                    <div
                        onClick={() => selectStarForFilter(1)}
                        className={
                            getStarFromUrl == 1
                                ? "single-rating active-star-row"
                                : "single-rating"
                        }
                    >
                        {renderStar(1)} & above
                    </div>
                </div>
            </div>
        );
    };

    const randerDiscount = () => {
        let arr = [];

        const discountValue = searchParams.get("discount");
        const renderDiscountValue = () => {
            const onchageDiscount = (i) => {
                const updatedSearchParam = new URLSearchParams(
                    searchParams.toString()
                );
                updatedSearchParam.set("discount", i);
                setSearchParams(updatedSearchParam.toString());
            };

            for (let i = 10; i <= 80; i = i + 10) {
                arr.push(
                    <div className="discount-range font-size-in-filter-section">
                        <input
                            className="check-discount"
                            type="radio"
                            value={discountValue}
                            id={i}
                            checked={discountValue == i}
                            onChange={() => onchageDiscount(i)}
                        ></input>
                        <label htmlFor={i}>{i}% and above</label>
                    </div>
                );
            }
            return arr;
        };

        return (
            <div className="discount-filter-section">
                <h3>DISCOUNT</h3>
                <div>{renderDiscountValue()}</div>
            </div>
        );
    };
    return (
        <div className="all-filter-category ">
            <div className="filter-section">
                <div className="filter-text">FILTER</div>
                <div onClick={() => clearAllFilterData()} className="clear-all">
                    CLEAR ALL
                </div>
            </div>

            {/* price-section */}
            <div>{renderPrice()}</div>

            {/* brand-section */}
            <div className="border-class-filter" />
            <div>{renderBrands()}</div>

            {/* rating-section */}
            <div className="border-class-filter" />
            <div>{randerRatings()}</div>

            {/* discount -section */}
            <div className="border-class-filter" />
            <div>{randerDiscount()}</div>
        </div>
    );
}
