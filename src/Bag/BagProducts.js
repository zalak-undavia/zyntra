import { useNavigate } from "react-router-dom";

export default function BagProducts({ v, i, deleteFromBag, onQtyChange }) {
    const nav = useNavigate();

    const discount = (price, discountPercentage) => {
        return Math.round(price - (price * discountPercentage) / 100);
    };

    const goBackToIndividualProduct = () => {
        nav(`/product?individualProduct=${v.id}`);
    };

    //   e event ni jarur bag ne nathi ... so we dont have to write
    // this function in bag componenet
    const selectKaryu = (e) => {
        console.log("value in select karyu", e.target.value);
        onQtyChange(Number.parseInt(e.target.value));
    };

    return (
        <div>
            <div className="single-product-main-container">
                <img
                    onClick={() => goBackToIndividualProduct()}
                    className="img-single-product-in-bag"
                    src={v.thumbnail}
                />
                <div className="all-details-single-product-in-bag">
                    <div className="single-product-bag-page">{v.title}</div>
                    <div className="font-size-bag padding-bag">
                        {v.description}
                    </div>
                    <div className="font-size-bag padding-bag">
                        <span>Qty</span>
                        <span>
                            <select
                                value={v.qty}
                                style={{ marginLeft: "10px" }}
                                onChange={selectKaryu}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </span>
                    </div>
                    <div>
                        <div className="font-size-bag padding-bag">
                            <span>Price</span> : Rs{" "}
                            {discount(v.price, v.discountPercentage)}
                            <span
                                style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                    marginLeft: "15px",
                                }}
                            >
                                {v.price}{" "}
                                <spna style={{ marginRight: "3px" }}></spna>
                            </span>
                            <span style={{ color: "red" }}>
                                ({v.discountPercentage} % OFF)
                            </span>
                        </div>
                    </div>
                    <div className="font-size-bag">
                        <span>
                            <span className="return-arrow-in-bag">
                                <i class="bi bi-arrow-return-left"></i>
                            </span>
                            14 days return available
                        </span>
                    </div>
                </div>
                <div
                    onClick={() => deleteFromBag(v, i)}
                    className="close-btn-in-bag-page"
                >
                    <i className="bi bi-x-lg cross-in-bag"></i>
                </div>
            </div>
        </div>
    );
}
