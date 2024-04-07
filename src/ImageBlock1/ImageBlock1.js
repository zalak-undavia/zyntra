import "./ImageBlock-1.css";

export default function ImageBlock1() {
    return (
        <div className="img-block-1-container">
            <div className="clr-box"></div>
            <img
                className="img-block-1-img"
                src="https://www.shoptherusticmarket.com/cdn/shop/files/09f0c36740ab662b000b0030dfc2947aca322a6f3d9bbe2089d65e85b6df6823_jpeg.webp?v=1703093699&width=700"
            />
            <div className="img-block-1-text">
                <span>
                    Style is a way to say who you are without having to speak.
                </span>
                <br />
                <span style={{ fontSize: "20px" }}> -Rachel Zoe</span>
            </div>
        </div>
    );
}
