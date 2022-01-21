import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../store/actions/cartActions";

const CartScreen = ({ match, location, history}) => {
  const dispatch = useDispatch();
  const cart = useSelector( state => state.cart);
  const {cartItems} = cart;
  const productId = match.params.id 
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  console.log(cartItems); 
  React.useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);

  console.log(qty)
  return(
    <>hello wrold</>
  )
}

export default CartScreen;