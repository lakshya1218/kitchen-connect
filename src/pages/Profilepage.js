import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Profilepage.css";
import ordericon from "../assets/ordericon.jpg";
import logouticon from "../assets/Logouticon.jpg";
import Editicon from "../assets/Editicon.jpg";
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ImageUploadButton from "../components/ImageUploadButton";

function Profilepage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
  function handleLogout() {
    localStorage.clear();
    dispatch(logout());
  }

  return (
    <div className="wholeContainer1">
      <div className="imagecontainer">
        <div>
          <>
            {user && user.images && user.images.length > 0 ? (
              <img
                src={user.images[0].url}
                alt={user.name}
                className="prfpagecustom"
              />
            ) : (
              <i className="fa fa-user prfpagecustom"></i>
            )}
          </>
          <h3>{user.name}</h3>
        </div>
      </div>
      <div className="linksContainer">
        <LinkContainer to="/orders" className="responsiveLink">
          <div className="linksdesigns">
            <div className="Namicon">
              <img src={ordericon} className="iconimg" alt="Order" />
              <p> My Orders</p>
            </div>
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-right arrowr"
                viewBox="0 0 16 16"
              >
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            </div>
          </div>
        </LinkContainer>
        <LinkContainer to="/resetpassword" className="responsiveLink">
          <div className="linksdesigns">
            <div className="Namicon">
              <img src={Editicon} alt="edit" className="iconimg2" />
              <p>Change Password</p>
            </div>
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-right arrowr"
                viewBox="0 0 16 16"
              >
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            </div>
          </div>
        </LinkContainer>
        <LinkContainer to="/cart" className="responsiveLink">
          <div className="linksdesigns">
            <div className="Namicon">
              <i
                className="fas fa-shopping-cart"
                style={{ color: "purple" }}
              ></i>
              <p>Cart</p>
            </div>
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-right arrowr"
                viewBox="0 0 16 16"
              >
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            </div>
          </div>
        </LinkContainer>
        <LinkContainer to="/orders" className="responsiveLink">
          <div className="linksdesigns">
            <div className="Namicon">
              <img src={logouticon} alt="logout" className="iconimg1" />
              <Button onClick={handleLogout} className="logout-btn">
                Logout
              </Button>
            </div>
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-right arrowr"
                viewBox="0 0 16 16"
              >
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            </div>
          </div>
        </LinkContainer>
        <ImageUploadButton />
      </div>
    </div>
  );
}

export default Profilepage;
