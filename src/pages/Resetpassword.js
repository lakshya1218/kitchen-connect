import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useSelector } from "react-redux";
import axios from "axios";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    if (password === confirmpassword) {
      e.preventDefault();
      try {
        const userId = user._id;
        const response = await axios.patch(
          "https://kitchen-connect-pegc.onrender.com/users/resetpassword",
          {
            userId,
            password,
          }
        );
        const data = response.data;

        if (data) {
          alert("password changed succesfully");
          navigate("/");
        } else {
          alert("Error occurred while Changing Password");
        }
      } catch (error) {
        console.error("Error while Changing Password:", error);
      }
    } else {
      alert("password does not match with confirm password");
    }
  };
  return (
    <Row className="justify-content-center cls">
      <Col md={6} className="login__form--container">
        <Form className="formstyle" onSubmit={handleSubmit}>
          <h1 style={{ color: "#35026A" }}>Change Password</h1>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              value={confirmpassword}
              required
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="alg">
            <Button type="submit" className="btnclr">
              Change Password
            </Button>
          </Form.Group>

          <p className="pt-3 text-center">
            Don't have an account? <Link to="/signup">Create account</Link>{" "}
          </p>
        </Form>
      </Col>
    </Row>
  );
}

export default Resetpassword;
