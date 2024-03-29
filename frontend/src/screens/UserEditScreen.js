import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../store/actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetails;
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate;

  React.useEffect(() => {
    if(successUpdate) {
      dispatch({type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if(!user.name || user._id!==userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }

  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  }

  return (
    <>
      <Nav.Link as={Link} to="/admin/userList" className="btn btn-light my-3">Go Back</Nav.Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader /> }
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen;