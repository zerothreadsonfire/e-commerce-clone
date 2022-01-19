import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from "./reducers/productReducer";

const initialState = {};
// const middleware = [thunk];

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
