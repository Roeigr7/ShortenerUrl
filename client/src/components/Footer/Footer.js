import React from 'react';
import { Col, Row } from 'react-bootstrap';
const Footer = () => {
  return (
    <Row className=' mx-0 m-0 py-3 bg-dark footer'>
      <Col>
        <p className='text-center footer-text'>
          2021 | Roei Grinshpan | App made with React, Redux, Bootstrap, Nodejs,
          expres, mongoDB
        </p>
      </Col>
    </Row>
  );
};
export default Footer;
