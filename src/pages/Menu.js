import React, { useEffect } from "react";
import categories from "../categories";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Menu() {
 
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);

  const categoriesInRows = [];
  for (let i = 0; i < categories.length; i += 4) {
    categoriesInRows.push(categories.slice(i, i + 4));
  }

  return (
    <div >
      <div className="recent-products-container container mt-4">
        {categoriesInRows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((category) => (
              <LinkContainer
                to={`/category/${category.name}`}
                key={category.name}
              >
                <Col md={3} xs={6}>
                  <div
                    style={{
                      backgroundImage: `url(${category.img})`,
                      gap: "10px",
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
    </div>
  );
}
