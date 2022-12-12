import {legacy_createStore as createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;