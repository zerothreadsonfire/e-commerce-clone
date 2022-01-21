import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { productListReducer, productDetailsReducer } from "./reducers/productReducer";

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage
  }
};
// const middleware = [thunk];

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
