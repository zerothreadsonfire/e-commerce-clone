import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../store/actions/userActions";

const UserListScreen = ({history}) => {
  
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList;
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete;

  React.useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login")
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure ?')) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? <i className="fas fa-check" style={{color: "green"}}></i> : 
                    <i className="fas fa-times" style={{color: "red"}}></i>}
                </td>
                <td>
                  <Nav.Link as={Link} to={`/admin/user/${user._id}/edit`} className="btn btn-light btn-sm">
                    <i className="fas fa-edit"></i>
                  </Nav.Link>
                </td>
                <td>
                <Button variant="danger" onClick={() => deleteHandler(user._id)} className="btn btn-sm fas fa-trash">
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen;
