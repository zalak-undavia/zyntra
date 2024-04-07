import "./EmptyBag.css";
import { useNavigate } from "react-router-dom";

export default function EmptyBag() {
    const nav = useNavigate();

    const toWishListPage = () => {
        nav("/wishlist");
    };

    return (
        <div>
            <div className="bag-body-section">
                <div className="empty-bag-section">
                    <h1>Hey, it feels so light!</h1>
                    <div className="bag-text">
                        There is nothing in your bag.
                        <br /> Let's add some items.
                    </div>
                    <img
                        className="empty-bag-img"
                        src="https://us.123rf.com/450wm/kozyrevaelena/kozyrevaelena1612/kozyrevaelena161200589/67351828-sad-gift-wrap-package-sale-illustrator-vector.jpg?ver=6"
                    />

                    <button
                        onClick={() => toWishListPage()}
                        className="wishlist-in-bag "
                    >
                        ADD ITEMS FROM WISHLIST
                    </button>
                </div>
            </div>
        </div>
    );
}
