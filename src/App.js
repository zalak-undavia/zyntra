import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth.js";
import Home from "./Home/Home.js";
import "./App.css";
import HeaderBar from "./HeaderBar/HeaderBar.js";
import SelectedCategory from "./SelectedCategory/SelectedCategory.js";
import IndividualProduct from "./IndividualProduct/IndividualProduct.js";
import Profile from "./Profile/Profile.js";
import Wishlist from "./Wishlist/Wishlist.js";
import Bag from "./Bag/Bag.js";
import ReqAuth from "./ReqAuth.js";
import { HeaderContext } from "./HeaderContext.js";
import Footer from "./Footer/Footer.js";

function App() {
    return (
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
                </div>
            </HeaderContext>
        </AuthProvider>
    );
}

export default App;

// notes =
// jyare koi componemt ne alkha project ma same rakhvo hoi
// tyare atle ke bija page per jav to pn aa aani jagya aaj reh aavu rakhvu
// hoy tyare ane routes ni bar muki devanu

// url ma obj or array hoi to json stringyfy kari nalkhvanu
// bakiname jarur nathi
// url ma always string j hoi

// bootstarp ma icons ma library ma
// index.html  ma aak link lakhvi pade
// je bootstarp icon ma niche cdn ma lakheli hoy
// bass pachi tu i vala icons use kari sake

// btw svg ne u can not give class
