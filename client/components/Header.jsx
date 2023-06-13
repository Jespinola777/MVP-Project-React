import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Header = ({ onProfileClick }) => {
  return (
    <Navbar style={{ backgroundColor: "rgb(12, 56, 12)", color: "white" }}>
      <Container>
        <Navbar.Brand style={{ color: "white" }} href="#home">
          Book Website
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ color: "white" }}>
            Signed in as: <a href="#login"></a>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button variant="secondary" onClick={onProfileClick}>
          Profile
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
