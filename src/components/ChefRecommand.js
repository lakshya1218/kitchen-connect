import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "../axios";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../services/appApi";
import "../pages/Seller.css";
import ToastMessage from "../components/ToastMessage";
import { LinkContainer } from "react-router-bootstrap";

function ChefRecommand() {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  useEffect(() => {
    axios
      .get(`/products`)
      .then(({ data }) => {
        const chefRecommandedProducts = data.filter(
          (product) => product.chefrecomended === "ChefRecommanded"
        );
        setProducts(chefRecommandedProducts);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="backgrnd">
      <h2 style={{ textAlign: "left", color: "#35026A", margin: "22px" }}>
        Chef Recommended
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

export default ChefRecommand;
