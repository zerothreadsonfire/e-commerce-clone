import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../store/actions/orderActions";

const OrderListScreen = ({history}) => {
  
  const dispatch = useDispatch();
  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList;
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login")
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : 
                    <i className="fas fa-times" style={{color: "red"}}></i>}
                </td>
                <td>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : 
                    <i className="fas fa-times" style={{color: "red"}}></i>}
                </td>
                <td>
                  <Nav.Link as={Link} to={`/order/${order._id}/edit`} className="btn btn-primary btn-sm">Details</Nav.Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen;
