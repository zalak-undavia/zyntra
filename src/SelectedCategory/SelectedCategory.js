import "./SelectedCategory.css";
import SingleCategory from "../SingleCategory/SingleCategory";
import { useSearchParams, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterContainer from "../FilterContainer/FilterContainer";
import FilterNew from "../FilterNew/FilterNew";

export default function SelectedCategory() {
    const [data, setData] = useState([]);
    const params = useParams();
    const categoryName = params.category;

    useEffect(() => {
        const asyncFun = async () => {
            try {
                const request = await fetch(
                    "https://dummyjson.com/products?limit=3000"
                );
                const response = await request.json();
                window.scroll(0, 0);
                setData(response.products);
            } catch (e) {
                console.log("error", e);
            }
        };

        asyncFun();
    }, []);

    const productNameCategory = data.filter((v, i) => {
        return v.category === categoryName;
    });

    return (
        <div>
            <div className="selected-cat-main-page">
                <div className="left-container">
                    <FilterNew productNameCategory={productNameCategory} />
                    {/* <FilterContainer
                        productNameCategory={productNameCategory}
                    /> */}
                </div>
                <div className="right-container">
                    <SingleCategory productNameCategory={productNameCategory} />
                </div>
            </div>
        </div>
    );
}
