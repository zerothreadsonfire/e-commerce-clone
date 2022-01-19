import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productListReducer from "./reducers/productReducer";

const initialState = {};
// const middleware = [thunk];

const reducers = combineReducers({
  productList: productListReducer
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
