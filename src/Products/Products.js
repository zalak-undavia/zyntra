import { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Products() {
    const [productsCategories, setProductsCategories] = useState([]);
    const nav = useNavigate();

    const CatagoryImages = [
        "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_640.jpg",
        "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://t3.ftcdn.net/jpg/04/22/50/10/360_F_422501065_iKBL7qoOhaXqjxONodvSnGmuuwkt7pbf.jpg",
        "https://static.blog.bolt.eu/LIVE/wp-content/uploads/2022/04/30135418/grocery-list-1024x536.jpg",
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww",
        "https://thetimberguy.com/cdn/shop/collections/retro_style_wooden_furniture_range_2048x.jpg?v=1538212508",
        "https://ih1.redbubble.net/image.685880856.5531/ssrco,classic_tee,two_models,fafafa:ca443f4786,front,tall_portrait,750x1000.1.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IduQKSOB-aC8EToeWNK_id8Q5ulgaFA-wg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS43pUURQE1wPmTkuyqRIZGUwQx43CtbTwGgAS_pLexjJCBpFAilRkGa-fV5MRUGZyHOko&usqp=CAU",
        "https://sslimages.shoppersstop.com/sys-master/images/h26/h08/28890781843486/S23LCSOCOTFS83A_NAVY_alt2.jpg_2000Wx3000H",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmlQzX8EeFp4bMcIipeJ5LQvFsgYXs-UypQ&usqp=CAU",
        "https://www.themanual.com/wp-content/uploads/sites/9/2023/06/austin-lowman-qS3sqPT1T9s-unsplash.jpg?p=1",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlus8RLYzcPc4jUe_ffiKF57s-g-3RnYU4XqZZ6hnkzREunAxEnHYL9U0UcuflJXDTk0A&usqp=CAU",
        "https://i.etsystatic.com/6224977/r/il/89285d/1672687759/il_570xN.1672687759_blnc.jpg",
        "https://img.freepik.com/free-photo/portrait-young-woman-with-earrings-with-gems-isolated_132075-10060.jpg?size=626&ext=jpg&ga=GA1.1.1658424502.1705506194&semt=ais",
        "https://images.unsplash.com/photo-1548426244-daec2adda8c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1bmdsYXNzZXMlMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1547076286-60c93f1a3652?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXV0b21vdGl2ZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/567985/pexels-photo-567985.jpeg?auto=compress&cs=tinysrgb&w=600",
    ];

    useEffect(() => {
        const asyncFun = async () => {
            try {
                const request = await fetch(
                    "https://dummyjson.com/products/categories"
                );
                const response = await request.json();
                setProductsCategories(response);
            } catch (e) {
                console.log("error", e);
            }
        };

        asyncFun();
    }, []);

    const selectCategory = (vastu) => {
        // console.log("aa vastu no type of", typeof vastu);
        // aa string che

        // nav(`/selectedCategory?productCategory=${vastu}`);
        nav(`/selectedCategory/${vastu}`);
    };

    return (
        <div className="products-container">
            <div className="inside-product-container">
                <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-5">
                    {productsCategories.map((v, idx) => (
                        <Col key={idx}>
                            <Card
                                className="single-card"
                                onClick={() => selectCategory(v)}
                            >
                                <Card.Img
                                    className="card-img"
                                    variant="top"
                                    src={CatagoryImages[idx]}
                                />
                                <Card.Body className="card-body">
                                    <Card.Title className="category-name">
                                        {v.toUpperCase()}
                                    </Card.Title>
                                    <Card.Text className="shop-now">
                                        shop now
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

// <div>box</div>
// <div>{productsCategories}</div>

// <div
// onClick={() => selectCategory(v)}
// key={i}
// className="image-category-block"
// >
// <div className="image-category-picture">
//   <img className="picture" src={CatagoryImages[i]} />
// </div>
// <div className="category-name">{v.toUpperCase()}</div>
// <div className="shop-now">SHOP NOW</div>
// </div>

{
    /* <Row xs={1} md={3} lg={5} xl={8} className="g-4">
{productsCategories.map((v, i) => {
  return (
    <Col key={i}>
      <Card className="aa">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a
            natural lead-in to additional content. This content is a
            little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
})}
</Row> */
}