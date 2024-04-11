import Card from "react-bootstrap/Card";
import "./SingleCategory.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SingleCategory({ productNameCategory }) {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();

    const discount = (price, discountPercentage) => {
        return Math.round(price - (price * discountPercentage) / 100);
    };

    const prices = productNameCategory.map((v) =>
        discount(v.price, v.discountPercentage)
    );

    const minValueFromUrl = searchParams.get("min") || "";
    const maxValueFromUrl = searchParams.get("max") || "";

    const minToConsider = minValueFromUrl
        ? minValueFromUrl
        : Math.min(...prices);

    const maxToConsider = maxValueFromUrl
        ? maxValueFromUrl
        : Math.max(...prices);

    const selectProduct = (product) => {
        nav(`/product?individualProduct=${product.id}`);
    };

    const renderProducts = () => {
        const getStarFromUrl = searchParams.get("ratings");
        const getDiscountValue = searchParams.get("discount");
        const totalBrands = searchParams.get("brands") || "";

        const splitedTotalBrands = totalBrands.split(",");

        // rating with discount arr-
        const filteredArray = productNameCategory
            .filter((v, i) => {
                return (
                    discount(v.price, v.discountPercentage) >= minToConsider &&
                    discount(v.price, v.discountPercentage) <= maxToConsider
                );
            })
            .filter((v, i) => {
                if (totalBrands == "") {
                    return true;
                } else {
                    if (splitedTotalBrands.includes(v.brand)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            })

            .filter((v, i) => {
                return v.rating >= getStarFromUrl;
            })
            .filter((v, i) => {
                return v.discountPercentage >= getDiscountValue;
            });

        return (
            <div className="single-category-container-zz">
                {filteredArray.map((v, idx) => (
                    <Card
                        className="selected-cat-name"
                        key={idx}
                        onClick={() => selectProduct(v)}
                    >
                        <Card.Img
                            className="card-img single-category-card-img"
                            variant="top"
                            src={v.thumbnail}
                        />
                        <div className="rating-box">
                            {v.rating}

                            <span>
                                <i className="bi bi-star-fill star-icon-category-list"></i>
                            </span>
                            <span style={{ marginRight: "10px" }}>|</span>
                            <span>{v.title.length}</span>
                        </div>
                        <Card.Body className="card-body">
                            <Card.Title className=" wish-category-name ">
                                {v.title}
                            </Card.Title>
                            <Card.Text className="shop-now to-point">
                                {v.brand}
                            </Card.Text>
                            <Card.Text className="not-point">
                                Price : Rs{" "}
                                {discount(v.price, v.discountPercentage)}
                                <span
                                    style={{
                                        textDecoration: "line-through",
                                        color: "gray",
                                        marginLeft: "15px",
                                    }}
                                >
                                    {v.price}
                                </span>
                                <span style={{ color: "red" }}>
                                    ({v.discountPercentage} % OFF)
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    };

    return <div>{renderProducts()}</div>;
}
