import { useState, useEffect } from "react";
import "./CategoryPopUp.css";

export default function CategoryPopUp({ selectCategory }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const asyncFun = async () => {
            try {
                const request = await fetch("https://dummyjson.com/products");
                const response = await request.json();
                setData(response.products);
            } catch (e) {
                console.log("error", e);
            }
        };

        asyncFun();
    }, []);

    const renderCategory = () => {
        const type = selectCategory.toLowerCase();
        const category = data.filter((v, i) => {
            if (type === v.category.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        });

        return category.map((value, index) => {
            return (
                <div>
                    <div key={index}>{value.brand}</div>
                </div>
            );
        });
    };

    return <div className="categoryPopUp">{renderCategory()}</div>;
}
