import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../../constants/userConstants"

const login = (email, password) => async (dispatch) => {
  try{
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post("/api/users/login", {email, password}, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": 
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
  dispatch({
    type: USER_LOGOUT
  })
}

export {
  login,
  logout
}