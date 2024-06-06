import { useState } from "react";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../auth.js";
import { useAuth } from "../auth.js";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [inputUserName, setInputValue] = useState("");
    const [inputPassword, setInputPassWord] = useState("");

    const nav = useNavigate();
    const auth = useAuth();

    const submitInfo = (e) => {
        e.preventDefault();
        auth.loggedIn(inputUserName);
    };

    const userLoggedInFun = () => {
        nav("/", { replace: true });
        window.scroll(0, 0);
    };

    const logInSection = () => {
        return (
            //   <div className="log-in-sec">
            <div className="profile">
                <Form onSubmit={submitInfo} className="profile-login">
                    <Form.Group className="mb-5">
                        <Form.Label className="password">Username</Form.Label>
                        <Form.Control
                            value={inputUserName}
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                            required
                            placeholder="Enter username"
                        />
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Label className="password">Password</Form.Label>
                        <Form.Control
                            value={inputPassword}
                            onChange={(e) => setInputPassWord(e.target.value)}
                            required
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Button
                        style={{
                            marginTop: "20px",
                            width: "100%",
                            fontSize: "20px",
                            padding: "10px 10px",
                        }}
                        variant="dark"
                        type="submit"
                    >
                        Login
                    </Button>
                    <Form.Text>
                        <div className="text-muted-z">
                            We'll never share your personal data with anyone
                            else
                        </div>
                    </Form.Text>
                </Form>
            </div>
            //   </div>
        );
    };
    return (
        <div className="login-section-profile-sec-zz">
            <div className="profile-page">
                <div className="outer-img-profile-sec">
                    <img
                        src="https://cdn.dribbble.com/userupload/8922470/file/original-1bca1401cc6221aed089c8db67f4dd1c.jpg?resize=1024x661"
                        className="profile-img"
                    />
                </div>
                <div className="login-section-ss">
                    {auth.userName ? userLoggedInFun() : logInSection()}
                </div>
            </div>
        </div>
    );
}
