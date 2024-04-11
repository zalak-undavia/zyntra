import { Routes, Route } from "react-router-dom";

import { HeaderContext } from "./HeaderContext.js";
import { AuthProvider } from "./auth.js";
import ReqAuth from "./ReqAuth.js";

import HeaderBar from "./HeaderBar/HeaderBar.js";
import Home from "./Home/Home.js";
import SelectedCategory from "./SelectedCategory/SelectedCategory.js";
import IndividualProduct from "./IndividualProduct/IndividualProduct.js";
import Profile from "./Profile/Profile.js";
import Wishlist from "./Wishlist/Wishlist.js";
import Bag from "./Bag/Bag.js";
import Footer from "./Footer/Footer.js";

import "./App.css";

function App() {
    return (
        <>
            <AuthProvider>
                <HeaderContext>
                    <HeaderBar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/wishlist"
                                element={
                                    <ReqAuth>
                                        <Wishlist />
                                    </ReqAuth>
                                }
                            />
                            <Route
                                path="/bag"
                                element={
                                    <ReqAuth>
                                        <Bag />
                                    </ReqAuth>
                                }
                            />
                            <Route
                                path="/selectedCategory/:category"
                                element={<SelectedCategory />}
                            ></Route>
                            <Route
                                path="/product"
                                element={<IndividualProduct />}
                            />
                        </Routes>
                        <Footer />
                        <div className="name-footer-zalak">
                            Created with ❤️ by
                            <a className="profile-link-zalak" target="_blank">
                                Zalak Undavia
                            </a>
                        </div>
                    </div>
                </HeaderContext>
            </AuthProvider>
        </>
    );
}

export default App;
