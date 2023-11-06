import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
import Pagination from "./Pagination";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const navigate = useNavigate();
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
  function handleDeleteProduct(id) {
    if (window.confirm("Are you sure?"))
      deletProduct({ product_id: id, user_id: user._id });
  }

  function TableRow({ pictures, _id, name, price }) {
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview" />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <Button
            onClick={() => handleDeleteProduct(_id, user._id)}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Link to={`/product/${_id}/edit`} className="btn btn-warning">
            Edit
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
}

export default DashboardProducts;
