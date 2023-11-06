import React from "react";
import { Spinner } from "react-bootstrap";
function Loading() {
  return (
    <div
      className="loading-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Please wait...</h2>
      <Spinner animation="grow" />
    </div>
  );
}

export default Loading;
