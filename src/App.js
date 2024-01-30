import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home.js";
import "./App.css";
import HeaderBar from "./HeaderBar/HeaderBar.js";
import Products from "./Products/Products.js";
import SingleCategory from "./SingleCategory/SingleCategory.js";
import SelectedCategory from "./SelectedCategory/SelectedCategory.js";

function App() {
  return (
    <>
      <HeaderBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/selectedCategory"
            element={<SelectedCategory />}
          ></Route>
          <Route path="/singleCategory" element={<SingleCategory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

// notes =
// jyare koi componemt ne alkha project ma same rakhvo hoi
// tyare atle ke bija page per jav to pn aa aani jagya aaj reh aavu rakhvu
// hoy tyare ane routes ni bar muki devanu
