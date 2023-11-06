import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
import { useSelector } from "react-redux";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [chefrecomended, setChefrecomended] = useState(false);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
    if (
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY) &&
      !user.isAdmin
    ) {
      navigate("/");
    }
  }, []);
  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }
    createProduct({
      name,
      description,
      price,
      category,
      images,
      bestseller,
      chefrecomended,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }
  const handleCheckBoxClick = (label, value, setter) => {
    if (value) {
      setter(false);
    } else {
      setter(true);

      console.log(`Sending value "${label}" to the backend`);
    }
  };
  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dzjsttrzz",
        uploadPreset: "qszlcuzy",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a product</h1>
            {isSuccess && (
              <Alert variant="success">Product created with succcess</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (₹)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="NorthIndian">North Indian</option>
                <option value="Tandoori">Tandoori</option>
                <option value="Chinese">Chinese</option>
                <option value="Continental">Continental</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 custom">
              <Form.Check
                type="checkbox"
                label="Bestseller"
                checked={bestseller}
                onChange={() => setBestseller(bestseller ? "" : "Bestseller")}
              />
              <Form.Check
                type="checkbox"
                label="Chef-Recommended"
                checked={chefrecomended}
                onChange={() =>
                  setChefrecomended(chefrecomended ? "" : "ChefRecommanded")
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
                    {imgToRemove != image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
