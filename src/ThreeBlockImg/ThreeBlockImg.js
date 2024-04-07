import "./ThreeBlockImg.css";

export default function ThreeBlockImg() {
  return (
    <div className="three-block-img-main-container-zz">
      <div className="three-block-img-container">
        <div className="side-block-three-block-img"></div>
        <div className="three-block-img-sub-container">
          <div className="block-img">
            <img
              className="img-in-block"
              src="https://www.lechicstreet.com/wp-content/uploads/2023/01/82C9D252-5F65-4DBF-B2E2-7161CE64407E.jpeg"
            />
            <div className="img-text">Style</div>
          </div>
          <div className="block-img">
            <div className="img-text sec-img">Fashion</div>
            <img
              className="img-in-block"
              src="https://insertface.com/fb/1079/street-style-outfit-male-1079487-ufrd0-fb.jpg"
            />
          </div>
          <div className="block-img">
            <img
              className="img-in-block"
              src="https://i.pinimg.com/474x/8b/08/12/8b0812dd58dec7a4d7538387110385a2.jpg"
            />
            <div className="img-text">Love</div>
          </div>
        </div>
        <div className="right-block"></div>
      </div>
    </div>
  );
}

// carousel img
// https://www.wfla.com/wp-content/uploads/sites/71/2023/04/GettyImages-675594794.jpg?strip=1
