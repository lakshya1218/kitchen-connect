import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { useSignupMutation } from "../services/appApi";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [otpform, setOtpform] = useState(false);
  const [otpinput, setOtpinput] = useState("");
  const [checkotp, setCheckotp] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleSignup = async (e) => {
    setLoading(true);
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
        setLoading(false);
        setCheckotp(data.otp);
        setOtpform(true);
      } else {
        alert("Error occurred while sending OTP");
      }
    } catch (error) {
      console.error("Error while sending OTP:", error);
    }
  };

  const handleOtpSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (otpinput === checkotp) {
      // Verify the OTP
      signup({ name, email, password, phone, date });
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify('user',user)
      );
      setLoading(false);
    } else {
      alert("Incorrect OTP"); // Display an error message
    }
  };
  if (loading) return <Loading />;
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="signup__form--container">
          {otpform ? (
            <Form className="formstyle" onSubmit={handleOtpSubmit}>
              <h1 style={{ color: "#35026A" }}>Enter OTP</h1>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group>
                <Form.Label>Enter OTP : </Form.Label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpinput}
                  required
                  onChange={(e) => setOtpinput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="alg">
                <Button type="submit" disabled={isLoading} className="btnclr">
                  Verify OTP
                </Button>
              </Form.Group>
            </Form>
          ) : (
            <Form className="formstyle" onSubmit={handleSignup}>
              <h1 style={{ color: "#35026A" }}>Create an account</h1>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Group className="mb-3">
                  <Form.Label> Create Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+91......"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="alg">
                <Button type="submit" disabled={isLoading} className="btnclr">
                  Create account
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

export default Signup;
