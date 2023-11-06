import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import noorder from "../assets/noorder.png";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data.reverse());
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {orders.length > 0 && (
        <>
          <h1 className="text-center">Your orders</h1>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{order._id}</td>
                  <td>
                    <Badge
                      bg={`${
                        order.status == "processing" ? "warning" : "success"
                      }`}
                      text="white"
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>{order.date}</td>

                  <td>₹{order.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {orders.length === 0 && (
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
      )}
    </Container>
  );
}

export default OrdersPage;
