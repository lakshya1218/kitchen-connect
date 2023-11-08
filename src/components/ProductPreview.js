import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProductPreview({ _id, category, name, pictures }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "30rem", margin:"4px" }}
    >
      <Card style={{ width: "50rem",margin:"1px" }}>
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={pictures[0].url}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Badge bg="warning" text="dark">
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
