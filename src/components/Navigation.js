import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import logo from "../assets/logo.png";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  }
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status == "unread") return acc + 1;
    return acc;
  }, 0);

  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  }

  return (
    <Navbar className="navcolor" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" className="logo" />
          </Navbar.Brand>
        </LinkContainer>
        {user && (
          <>
            <LinkContainer to="/">
              <Navbar.Brand>
                <i className="fas fa-house"></i>Home{" "}
              </Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/menu">
              <Navbar.Brand>
                <i class="fa fa-bars" aria-hidden="true"></i>Menu{" "}
              </Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Navbar.Brand>
                <i className="fas fa-shopping-cart"></i>Cart
                {user?.cart.count > 0 && (
                  <span className="badge badge-warning" id="cartcount">
                    {user.cart.count}
                  </span>
                )}
              </Navbar.Brand>
            </LinkContainer>
          </>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if no user */}
            <LinkContainer to="/search">
              <div>
                <i className="fa fa-search sicon"></i>
              </div>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {/* if user */}
            {user && (
              <>
                <Nav.Link
                  style={{ position: "relative" }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className="fas fa-bell"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                  ></i>
                </Nav.Link>

                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/profile">
                      <div>
                        {user && user.images && user.images.length > 0 ? (
                          <img
                            src={user.images[0].url}
                            alt={user.name}
                            className="prfcustom"
                          />
                        ) : (
                          <i className="fa fa-user prfcustom"></i>
                        )}
                      </div>
                    </LinkContainer>
                  </>
                )}
                {user.isAdmin && (
                  <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                    {user.isAdmin && (
                      <>
                        <LinkContainer to="/admin">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/new-product">
                          <NavDropdown.Item>Create Product</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}

                    <NavDropdown.Divider />
                    <Button
                      variant="danger"
                      onClick={handleLogout}
                      className="logout-btn"
                    >
                      Logout
                    </Button>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* notifications */}
      <div
        className="notifications-container"
        ref={notificationRef}
        style={{
          position: "absolute",
          top: bellPos.top + 30,
          left: bellPos.left,
          display: "none",
        }}
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifcations yet</p>
        )}
      </div>
    </Navbar>
  );
}

export default Navigation;
