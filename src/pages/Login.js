import React, { useState } from "react";
import { Button, Col,Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./Login.css";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

function Login() {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    login({ email, password });
    localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify('user',user)
    );
    setLoading(false);
  }
  if (loading) return <Loading />;
  return (
    
      <Row className="justify-content-center cls">
        <Col md={6} className="login__form--container" >
          <Form className="formstyle" onSubmit={handleLogin}>
            <h1 style={{color:"#35026A"}}>Login</h1>
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
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="alg">
              <Button type="submit" disabled={isLoading}className="btnclr">
                Login
              </Button>
            </Form.Group>
            <p className="pt-3 text-center">
               <Link to="/forgotpassword">Forgot Password?</Link>{" "}
            </p>
            <p className="pt-3 text-center">
              Don't have an account? <Link to="/signup">Create account</Link>{" "}
            </p>
          </Form>
        </Col>
      </Row>
    
  );
}

export default Login;
