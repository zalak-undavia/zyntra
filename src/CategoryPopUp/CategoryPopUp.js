import { useState, useEffect } from "react";
import "./CategoryPopUp.css";

export default function CategoryPopUp({ selectCategory }) {
    const [data, setData] = useState([]);

    const info = [{ "smartphones & laptops ": [] }];

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

// zoom in karia to akhu weird dekhay che!

// ------------------------------------------------------
// learn for my-self

//
// every category niche aani brand aavi joia . ani mate nicheno code!

// const renderCategory = () => {
//     const type = selectCategory.toLowerCase();
//     const category = data.filter((v, i) => {
//       if (type === v.category.toLowerCase()) {
//         return true;
//       } else {
//         return false;
//       }
//     });

//     return category.map((value, index) => {
//       return (
//         <div>
//           <div key={index}>{value.brand}</div>
//         </div>
//       );
//     });
//   };

// nd  aa conmponent nu return!
//   return <div className="categoryPopUp">{renderCategory()}</div>;
//
