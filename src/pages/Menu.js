import React, { useEffect } from "react";
import categories from "../categories";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const categoriesInRows = [];
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);

  const columns = 2;
  const rows = Math.ceil(categories.length / columns);

  for (let i = 0; i < rows; i++) {
    categoriesInRows.push(categories.slice(i * columns, (i + 1) * columns));
  }

  const imageStyle = {
    width: "350px",
    height: "300px",
    gap: "5px",
    borderRadius: "10px",
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div className="recent-products-container container mt-4">
        {categoriesInRows.map((row, rowIndex) => (
          <Row key={rowIndex} className="displaying">
            {row.map((category) => (
              <LinkContainer
                to={`/category/${category.name}`}
                key={category.name}
              >
                <Col md={6}>
                  <div
                    style={{
                      backgroundImage: `url(${category.img})`,
                      ...imageStyle,
                    }}
                    className="category-tile"
                  ></div>
                </Col>
              </LinkContainer>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}
