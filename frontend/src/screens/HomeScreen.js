import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return <React.Fragment>
    <h1>Latest Products</h1>
    <Row>
      {
        products.map(product => {
          return <Col key={product._id} xl={3} lg={4} md={6} sm={12}>
            <Product product={product} />
          </Col>
        })
      }
    </Row>
  </React.Fragment>
}

export default HomeScreen;
