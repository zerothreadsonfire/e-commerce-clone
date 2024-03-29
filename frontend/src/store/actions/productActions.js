import axios from "axios";
import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL, 
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_DETAILS_SUCCESS, 
  PRODUCT_DETAILS_FAIL, 
  PRODUCT_DELETE_REQUEST, 
  PRODUCT_DELETE_SUCCESS, 
  PRODUCT_DELETE_FAIL, 
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from "../../constants/productConstants";

const listProducts = (keyword = '') => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST})
    const {data} = await axios.get(`/api/products?keyword=${keyword}`);
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});

  } catch(e) {
    dispatch({
      type: PRODUCT_LIST_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    })
  }
}

const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST})
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});

  } catch(e) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    })
  }
}

const deleteProduct = (id) => async (dispatch, getState) => {
  try{
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const {userLogin: {userInfo}} = getState();

    await axios.delete(`/api/products/${id}`, {
      headers: { "Authorization": `Bearer ${userInfo.token}` }
    });

    dispatch({ type: PRODUCT_DELETE_SUCCESS });

  } catch(e) {
    dispatch({
      type: PRODUCT_DELETE_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const createProduct = () => async (dispatch, getState) => {
  try{
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const {userLogin: {userInfo}} = getState();

    const {data} = await axios.post(`/api/products`, {}, {
      headers: { "Authorization": `Bearer ${userInfo.token}` }
    });

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });

  } catch(e) {
    dispatch({
      type: PRODUCT_CREATE_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const updateProduct = (product) => async (dispatch, getState) => {
  try{
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const {userLogin: {userInfo}} = getState();

    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}` 
      }
    });

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });

  } catch(e) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

const createProductReview = (productId, review) => async (dispatch, getState) => {
  try{
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

    const {userLogin: {userInfo}} = getState();

    await axios.post(`/api/products/${productId}/reviews`, review, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}` 
      }
    });

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });

  } catch(e) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL, 
      payload: e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
}

export {
  listProducts,
  listProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
