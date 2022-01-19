import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../store/actions/productActions';

const HomeScreen = () => {

  const dispatch = useDispatch();
  const productList = useSelector( state => state.productList);

  const { loading, error, products } = productList;

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return <React.Fragment>
    <h1>Latest Products</h1>
    {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (<Row>
      {
        products && products.map(product => {
          return <Col key={product._id} xl={3} lg={4} md={6} sm={12}>
            <Product product={product} />
          </Col>
        })
      }
    </Row>)}
  </React.Fragment>
}

export default HomeScreen;
