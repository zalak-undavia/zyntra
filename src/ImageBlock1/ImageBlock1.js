import "./ImageBlock-1.css";

export default function ImageBlock1() {
    return (
        <div className="img-block-1-container">
            <div className="clr-box"></div>
            <img
                className="img-block-1-img"
                src="https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXx4ODZHaEdGTVJaWXx8ZW58MHx8fHx8"
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
