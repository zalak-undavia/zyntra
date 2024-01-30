import "./Catagory.css";
import { useState } from "react";

import CategoryPopUp from "../CategoryPopUp/CategoryPopUp";

export default function Catagory() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");

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

  const mouseEnter = (e) => {
    setSelectCategory(e.target.innerText);
    setIsOpen(true);
  };

  const mouseLeave = () => {
    setSelectCategory("");
    setIsOpen(false);
  };
  return (
    <div>
      <div className="catagory-list">
        {categoryBar.map((v, i) => {
          return (
            <div
              onMouseEnter={(e) => mouseEnter(e)}
              onMouseLeave={() => mouseLeave()}
              key={i}
              className="single-catagory"
            >
              {v.slice(0, 1).toUpperCase() + v.slice(1)}
            </div>
          );
        })}
      </div>
      <div>{isOpen && <CategoryPopUp selectCategory={selectCategory} />}</div>
    </div>
  );
}
