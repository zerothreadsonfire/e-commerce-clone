import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../store/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart; 
  
  const [address, setAddress] = React.useState(shippingAddress.address);
  const [city, setCity] = React.useState(shippingAddress.city);
  const [postalCode, setPostalCode] = React.useState(shippingAddress.postalCode);
  const [country, setCountry] = React.useState(shippingAddress.country);
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    history.push("/payment");
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 /> 
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>postalCode</Form.Label>
          <Form.Control type="text" placeholder="Enter postalCode" value={postalCode} onChange={e => setPostalCode(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" value={country} onChange={e => setCountry(e.target.value)} required></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen;