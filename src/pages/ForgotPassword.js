import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { useForgotMutation } from "../services/appApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpform, setOtpform] = useState(false);
  const [otpinput, setOtpinput] = useState("");
  const [checkotp, setCheckotp] = useState("");
  const [forgot, { isError, isLoading, error }] = useForgotMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://kitchen-connect-pegc.onrender.com/users/sendmail",
        {
          email,
        }
      );

      const data = response.data;

      if (data) {
        setCheckotp(data.otp);
        setOtpform(true);
      } else {
        alert("Error occurred while sending OTP");
      }
    } catch (error) {
      console.error("Error while sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otpinput === checkotp) {
      // Verify the OTP
      try {
        forgot({ email });
        navigate("/resetpassword");
      } catch (error) {
        console.error("Error while sending OTP:", error);
      }
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="signup__form--container">
          {otpform ? (
            <Form className="formstyle" onSubmit={handleOtpSubmit}>
              <h1 style={{ color: "#35026A" }}>Enter OTP</h1>
              <Form.Group>
                <Form.Label>Enter OTP</Form.Label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpinput}
                  required
                  onChange={(e) => setOtpinput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="alg">
                <Button type="submit" className="btnclr">
                  Verify OTP
                </Button>
              </Form.Group>
            </Form>
          ) : (
            <Form className="formstyle" onSubmit={handleSubmit}>
              <h1 style={{ color: "#35026A" }}>Create an account</h1>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="alg">
                <Button type="submit" className="btnclr">
                  Get OTP
                </Button>
              </Form.Group>
              <p className="pt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>{" "}
              </p>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
