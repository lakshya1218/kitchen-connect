import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutForm(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const { discountPrice } = props;
  const amountInCents = Math.floor(discountPrice * 100);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  async function handlePlaceorder(e) {
    e.preventDefault();
    const paymenttype = "COD";
    createOrder({
      userId: user._id,
      cart: user.cart,
      address,
      country,
      phone,
      paymenttype,
    }).then((res) => {
      if (!isLoading && !isError) {
        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      }
    });
  }
  const customStyle = {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  };
  async function handlePay(e) {
    e.preventDefault();
    const paymenttype = "Card";
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      "https://kitchen-connect-pegc.onrender.com/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "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",
         
        },
        body: JSON.stringify({ amount: amountInCents }),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        alert("Error fetching payment details: " + error.message);
        setPaying(false);
      });
    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      createOrder({
        userId: user._id,
        cart: user.cart,
        address,
        country,
        phone,
        paymenttype,
      }).then((res) => {
        if (!isLoading && !isError) {
          setAlertMessage(`Payment ${paymentIntent.status}`);
          alert("Payment Successfull");
          setTimeout(() => {
            navigate("/orders");
          }, 2000);
        }
      });
    } else if (isError) {
      // Handle the payment error and display it in an alert
      alert(" failed to order food");
    }
  }

  return (
    <Col className="place-order-container">
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={user.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <div>
            <label style={{margin:"13px"}}>
              <input
                type="radio"
                value="card"
                checked={selectedPaymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                
              />
             Card
            </label>

            <label>
              <input
                type="radio"
                value="cash"
                checked={selectedPaymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery
            </label>
          </div>
        </Row>
        {selectedPaymentMethod === "card" && (
          <div className="Card payment">
            <span>
              Note : Only <b>Visa</b> or <b>MasterCard</b> is accepted
            </span>
            <div style={{ margin: "8px",padding: "19px"}}>
            <CardElement options={{ style: customStyle }}/>
            </div>
            <Button
              style={{width: "55%",
                margin: "10px",
                height: "50px"}}
              type="submit"
              disabled={user.cart.count <= 0 || paying || isSuccess}
            >
              {paying ? "Processing..." : `Pay ₹ ${discountPrice}`}
            </Button>
          </div>
        )}
        {selectedPaymentMethod === "cash" && (
          <div className="cash on delivery">
            <Button onClick={handlePlaceorder}>Place Order</Button>
          </div>
        )}
      </Form>
    </Col>
  );
}

export default CheckoutForm;
