import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../services/appApi";
import "./CartPage.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import noorder from "../assets/noorder.png";
import watch from "../assets/watch.jpg";

const stripePromise = loadStripe(
  "pk_live_51O96OdSBXFcsY2d493yhmSw4eLYRYxSzumZmtfYkhXB5mIK5YW4gdkpkxyKsSIk8X0JTzq5Rgmxf4DrrZy7HLalb00oQocD3X1"
);


function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const [discountPrice, setDiscountPrice] = useState(user.cart.total);
  const [showH3, setShowH3] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert("Can't proceed");
    decreaseCart(product);
  }
  const applyDiscount = () => {
    const discountedPrice = user.cart.total - user.cart.total * 0.2;
    setDiscountPrice(discountedPrice);
    setShowH3(true);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Container
        style={{ minHeight: "95vh" }}
        className="cart-container custom"
      >
        <h1 className="Pagename">Shopping cart</h1>
        <div className="deliverynote">
          <img src={watch} className="watch" alt="time" />
          <h6>
            Delivery in <b>25-30 min</b>
          </h6>
        </div>
        <div className="foodcontainer">
          {cart.length > 0 && (
            <Col md={5}>
              <>
                <Table responsive="sm" className="cart-table">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr>
                        <td>&nbsp;</td>
                        <td>
                          {!isLoading && !showH3 && (
                            <i
                              className="fa fa-times"
                              style={{ marginRight: 10, cursor: "pointer" }}
                              onClick={() =>
                                removeFromCart({
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                })
                              }
                            ></i>
                          )}
                          <img
                            src={item.pictures[0].url}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>₹{item.price}</td>
                        <td>
                          <span className="quantity-indicator">
                            {!showH3 && (
                              <>
                                <i
                                  className="fa fa-minus-circle"
                                  onClick={() =>
                                    handleDecrease({
                                      productId: item._id,
                                      price: item.price,
                                      userId: user._id,
                                    })
                                  }
                                ></i>
                              </>
                            )}
                            <span>{user.cart[item._id]}</span>
                            {!showH3 && (
                              <>
                                <i
                                  className="fa fa-plus-circle"
                                  onClick={() =>
                                    increaseCart({
                                      productId: item._id,
                                      price: item.price,
                                      userId: user._id,
                                    })
                                  }
                                ></i>
                              </>
                            )}
                          </span>
                        </td>
                        <td>₹{item.price * user.cart[item._id]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <h3 className="h4 pt-4">Total: ₹{user.cart.total}</h3>
                </div>
                <div>
                  <Button
                    onClick={applyDiscount}
                    style={{ backgroundColor: "red", border: "1px solid red" }}
                  >
                    Apply 20% Discount
                  </Button>
                  {showH3 && (
                    <h3 className="h4 pt-4">
                      After discount: ₹{discountPrice}
                    </h3>
                  )}
                </div>
              </>
            </Col>
          )}
        </div>
        <Col>
          {cart.length == 0 ? (
            <div style={{ margin: 55, padding: 62 }}>
              <img src={noorder} alt="no_order" />
              <h1>No Item Found !</h1>
              <p>Start you kitchen connect journey today</p>
              <Button
                onClick={() => navigate("/")}
                style={{ borderRadius: "20px" }}
              >
                Order Now
              </Button>
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm discountPrice={discountPrice} />
            </Elements>
          )}
        </Col>
      </Container>
    </div>
  );
}

export default CartPage;
