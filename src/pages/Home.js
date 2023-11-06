import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import offer from "../assets/offer.png";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import Loading from "../components/Loading";
import Seller from "./Seller";
import ChefRecommand from "../components/ChefRecommand";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  if (products.length === 0) return <Loading />;

  const categoriesInRows = [];
  for (let i = 0; i < categories.length; i += 4) {
    categoriesInRows.push(categories.slice(i, i + 4));
  }

  return (
    <div>
      <div className="recent-products-container container mt-4">
        <div className="wlcmbar">
          {!user && (
            <>
              <h6>Welcome to Kitchen Connect </h6>
            </>
          )}
          {user && (
            <>
              <h6>Hii {user.name}, Welcome to Kitchen Connect </h6>
            </>
          )}
        </div>
        <h2 style={{ textAlign: "left" }}>Choose your pick</h2>
        {categoriesInRows.map((row, rowIndex) => (
          <Row key={rowIndex} className="displaying">
            {row.map((category) => (
              <LinkContainer
                to={`/category/${category.name}`}
                key={category.name}
              >
                <Col md={3} xs={6}>
                  <div
                    style={{
                      backgroundImage: `url(${category.img})`,
                      gap: "5px",
                      borderRadius: "10px",
                    }}
                    className="category-tile"
                  ></div>
                  <h4>{category.name}</h4>
                </Col>
              </LinkContainer>
            ))}
          </Row>
        ))}
      </div>

      <div className="featured-products-container container ">
        <h2>OUR Foods</h2>
        <div className="d-flex">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              whiteSpace: "nowrap",

              scrollbarWidth: "thin",
              scrollbarColor: "rgb(15, 15, 15) lightgray",
              width: "100%",
              margin: "2px",
            }}
          >
            {lastProducts.slice(0, 4).map((product) => (
              <ProductPreview key={product.id} {...product} />
            ))}
          </div>
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "center",
              display: "block",
              textDecoration: "none",
              marginBottom: "5px",
            }}
          >
            See more {">>"}
          </Link>
        </div>
        <img src={offer} className="home-banner" />
        <Seller />
        <ChefRecommand />
      </div>
    </div>
  );
}

export default Home;
