import React from "react";
import { Row, Col } from "react-bootstrap";

import Logo from "../../img/Logo.png";

const Header = () => (
  <Row>
    <Col>
      <img className="app-logo" src={Logo} alt="NBN logo" />
    </Col>
  </Row>
);

export default Header;
