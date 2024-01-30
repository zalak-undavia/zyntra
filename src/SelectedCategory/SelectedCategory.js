import "./SelectedCategory.css";
import SingleCategory from "../SingleCategory/SingleCategory";
import { Outlet } from "react-router-dom";
export default function SelectedCategory() {
  return (
    <div>
      <div className="selected-cat-main-page">
        <div className="left-container">left-box</div>
        <div className="right-container">
          <SingleCategory />
        </div>
      </div>
    </div>
  );
}
