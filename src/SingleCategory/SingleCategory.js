import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./SingleCategory.css";

export default function SingleCategory() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const categoryName = searchParams.get("productCategory");

  useEffect(() => {
    const asyncFun = async () => {
      try {
        const request = await fetch(
          "https://dummyjson.com/products?limit=3000"
        );
        const response = await request.json();
        setData(response.products);
      } catch (e) {
        console.log("error", e);
      }
    };

    asyncFun();
  }, []);

  const renderProducts = () => {
    const productNameCategory = data.filter((v, i) => {
      return v.category === categoryName;
    });

    const discount = (price, discountPercentage) => {
      return (price - (price * discountPercentage) / 100).toFixed(0);
    };
    return (
      <div className="single-category-container">
        <Row xs={1} md={3} className="g-5">
          {productNameCategory.map((v, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img
                  className="card-img single-category-card-img"
                  variant="top"
                  src={v.thumbnail}
                />
                <div className="rating-box">hi</div>
                <Card.Body className="card-body">
                  <Card.Title className="category-name">{v.title}</Card.Title>
                  <Card.Text className="shop-now">{v.brand}</Card.Text>
                  <Card.Text className="shop-now">
                    Price : Rs {discount(v.price, v.discountPercentage)}
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
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return <div>{renderProducts()}</div>;
}

// usestate ma [data , setdata] = usestaste() aani andar jo [] ni badle
// " lahkyu" to filter ke map fervati vakhte aavu aavshe ke data.filter is not a function

// moti kame lagis

// return productNameCategory.map((v, i) => {
//     return (
//       <div className="each-product" key={i}>
//         <div>{v.id}</div>
//         <div>{v.title}</div>
//         <div>{v.brand}</div>
//         <div>{v.category}</div>
//         <div>{v.discountPercentage}</div>
//         <div>{v.price}</div>
//         <div>{v.rating}</div>
//         <div>{v.stock}</div>
//         <div>{v.price}</div>
//         <div>
//           <img src={v.thumbnail}></img>
//         </div>
//       </div>
//     );
//   });
