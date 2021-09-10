import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {

  const [products, setProducts] = React.useState([]);
  
  React.useEffect(() => {
    const fetchProducts = async () => {
      const {status, data} = await axios.get('http://localhost:5000/api/products/');
      if(status === 200) setProducts(data);
      // later handle error case
    }
    fetchProducts();
  }, []);

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
