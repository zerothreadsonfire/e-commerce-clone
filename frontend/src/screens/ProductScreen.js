import React from 'react';
import axios from 'axios';
import { Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    const fetchProduct = async () => {
      const {status, data} = await axios.get('http://localhost:5000/api/products/'+match.params.id);
      if(status === 200) setProduct(data);
      // later handle error case
    }
    fetchProduct();
  }, []);

  return (
    <React.Fragment>
      <Button as={Link} to="/" className="btn btn-light my-3">Go Back</Button>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn btn-block" disabled={product.countInStock === 0}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ProductScreen;
