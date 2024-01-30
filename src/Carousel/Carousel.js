import { useEffect, useState } from "react";
import "./Carousel.css";

export default function Carousel() {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    "./img/shopping1.jpg",
    "./img/shopping2.jpg",
    "./img/shopping3.jpg",
  ];

  const pereviousBtn = () => {
    setImageIndex((currentValue) => {
      if (currentValue <= 0) {
        return images.length - 1;
      } else {
        return currentValue - 1;
      }
    });
  };

  const nextBtn = () => {
    setImageIndex((currentValue) => {
      if (currentValue >= images.length - 1) {
        return 0;
      } else {
        return currentValue + 1;
      }
    });
  };

  //   useEffect(() => {
  //     const zalak = setInterval(() => {
  //       nextBtn();
  //     }, 4000);

  //     return () => {
  //       console.log("current", imageIndex);
  //       clearInterval(zalak);
  //     };
  //   }, []);
  return (
    <div className="caro-main-box">
      <div className="carousel-container">
        <button onClick={() => pereviousBtn()} className="left-slide-btn">
          &#60;
        </button>
        <img src={images[imageIndex]} className="image" />
        <button onClick={() => nextBtn()} className="right-slide-btn">
          &#62;
        </button>
      </div>
    </div>
  );
}
