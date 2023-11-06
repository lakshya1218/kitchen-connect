import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ImageUploadButton() {
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) {
      return alert("Please fill out all the fields");
    }
    try {
      const userId = user._id;
      const response = await axios.patch(
        "https://kitchen-connect-pegc.onrender.com/users/uploadpic",
        {
          userId,
          images,
        }
      );
      const data = response.data;

      if (data) {
        alert("Profile pic changed succesfully");
        navigate("/");
      } else {
        alert("Error occurred while Changing Picture");
      }
    } catch (error) {
      console.error("Error while Changing Picture:", error);
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
    <div>
      <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Button type="button" onClick={showWidget}>
            Change Profile pic
          </Button>
          <div className="images-preview-container">
            {images.map((image) => (
              <div className="image-preview">
                <img src={image.url} />
              </div>
            ))}
          </div>
        </Form.Group>
        {images.length > 0 && (
          <Form.Group>
            <Button type="submit">Change</Button>
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

export default ImageUploadButton;
