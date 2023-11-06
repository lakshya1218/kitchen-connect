import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

function ProductPreviewsecond({ _id, description, name, pictures }) {
  return (
    <Card
      key={_id}
      style={{
        width: "18rem",
        border: "1px solid #ced4da",
        boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
        margin: "24px",
      }}
    >
      <Card.Img variant="top" src={pictures[0].url} />
      <Card.Body>
        <Card.Title style={{ textAlign: "left" }}>{name}</Card.Title>
        <Card.Text style={{ textAlign: "left" }}>{description}</Card.Text>
        <div style={{ display: "flex", flexDirection: "row", gap: "80px" }}>
          <LinkContainer
            to={`/product/${_id}`}
            style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
          >
            <Button variant="primary">Check</Button>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductPreviewsecond;
