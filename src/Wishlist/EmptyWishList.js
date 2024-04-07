import "./EmptyWishList.css";
import { useNavigate } from "react-router-dom";

export default function EmptyWishList() {
    const nav = useNavigate();

    const continueShoppingFun = () => {
        nav("/");
    };
    return (
        <div className="empty-wishlist-body">
            <div className="empty-wishlist-block">
                <h1> Hey, your wishlist is empty</h1>
                <div className="empty-wish-text">
                    <div className="text">
                        Add items that you like to your wishlist. Review them
                        anytime and easily move them to the bag.
                    </div>
                </div>
                <div>
                    <img
                        className="empty-wishlist-img"
                        src="https://hjl.s3.eu-west-2.amazonaws.com/assets/images/Wishlist.jpg"
                    ></img>
                </div>

                <button
                    onClick={() => continueShoppingFun()}
                    className="continue-shopping-empty-wishlist-btn"
                >
                    CONTINUE SHOPPING
                </button>
            </div>
        </div>
    );
}
