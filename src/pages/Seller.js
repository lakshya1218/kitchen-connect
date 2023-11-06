import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "../axios";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../services/appApi";
import "./Seller.css";
import ToastMessage from "../components/ToastMessage";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";

function Seller() {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products`)
      .then(({ data }) => {
        const bestsellerProducts = data.filter(
          (product) => product.bestseller === "Bestseller"
        );
        setProducts(bestsellerProducts);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="backgrnd">
      <h2 style={{ textAlign: "left", color: "#35026A", margin: "22px" }}>
        BestSeller
      </h2>
      <div className="card-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <>
              {isSuccess && (
                <ToastMessage
                  bg="info"
                  title="Added to cart"
                  body={`${product.name} is in your cart`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyConten: "center",
                    alignItems: "center",
                  }}
                />
              )}
              <Card
                key={product._id}
                style={{
                  width: "18rem",
                  border: "1px solid #ced4da",
                  boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
                  margin: "24px",
                }}
              >
                <Card.Img
                  variant="top"
                  className="product-preview-img"
                  src={product.pictures[0].url}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title style={{ textAlign: "left" }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text style={{ textAlign: "left" }}>
                    {product.description}
                  </Card.Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "80px",
                    }}
                  >
                    <p>₹{product.price}</p>
                    {user && !user.isAdmin && (
                      <Button
                        className="btncustom"
                        onClick={() =>
                          addToCart({
                            userId: user._id,
                            productId: product._id,
                            price: product.price,
                            image: product.pictures[0].url,
                          })
                        }
                      >
                        Add item
                      </Button>
                    )}
                    {user && user.isAdmin && (
                      <LinkContainer to={`/product/${product._id}/edit`}>
                        <Button className="btncustom">Edit Product</Button>
                      </LinkContainer>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Seller;
