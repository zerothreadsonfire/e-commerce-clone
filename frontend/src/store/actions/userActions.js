import axios from "axios";
import { 
  USER_DETAILS_FAIL, 
  USER_DETAILS_REQUEST, 
  USER_DETAILS_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, 
  USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_UPDATE_PROFILE_FAIL, 
  USER_UPDATE_PROFILE_REQUEST, 
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../../constants/userConstants"
import { ORDER_LIST_MY_RESET } from "../../constants/orderConstants";

const login = (email, password) => async (dispatch) => {
  try{
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post("/api/users/login", {email, password}, {
      headers: {
        "Content-Type": "application/json",
      }
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch(e) {
    dispatch({
      type: USER_LOGIN_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET });
}

const register = (name, email, password) => async (dispatch) => {
  try{
    dispatch({ type: USER_REGISTER_REQUEST })

    const { data } = await axios.post("/api/users", {name, email, password}, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(data);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch(e) {
    dispatch({
      type: USER_REGISTER_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const getUserDetails = (id) => async (dispatch, getState) => {
  try{
    dispatch({ type: USER_DETAILS_REQUEST })

    const {userLogin: {userInfo}} = getState();

    const { data } = await axios.get(`/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}`
      }
    })

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

  } catch(e) {
    dispatch({
      type: USER_DETAILS_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const updateUserProfile = (user) => async (dispatch, getState) => {
  try{
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const {userLogin: {userInfo}} = getState();

    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}`
      }
    })

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });

  } catch(e) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const listUsers = () => async (dispatch, getState) => {
  try{
    dispatch({ type: USER_LIST_REQUEST })

    const {userLogin: {userInfo}} = getState();

    const { data } = await axios.get(`/api/users`, {
      headers: { "Authorization": `Bearer ${userInfo.token}` }
    })

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    });

  } catch(e) {
    dispatch({
      type: USER_LIST_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const deleteUser = (id) => async (dispatch, getState) => {
  try{
    dispatch({ type: USER_DELETE_REQUEST })

    const {userLogin: {userInfo}} = getState();

    await axios.delete(`/api/users/${id}`, {
      headers: { "Authorization": `Bearer ${userInfo.token}` }
    })

    dispatch({ type: USER_DELETE_SUCCESS });

  } catch(e) {
    dispatch({
      type: USER_DELETE_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const updateUser = (user) => async (dispatch, getState) => {
  try{
    dispatch({ type: USER_UPDATE_REQUEST })

    const {userLogin: {userInfo}} = getState();

    const { data } = await axios.put(`/api/users/${user._id}`, user, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}` 
      }
    })

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

  } catch(e) {
    dispatch({
      type: USER_UPDATE_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

export {
  login,
  logout,
  register,
  getUserDetails,
  updateUserProfile,
  listUsers,
  deleteUser,
  updateUser
}
