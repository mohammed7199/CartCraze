import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import productsReducer from '../reducers/productsReducer';
import cartReducer from "../reducers/cartReducer";
import userReducer from "../reducers/userReducer";
import supplierLoginReducer from "../reducers/supplierLoginReducer";
import paymentReducer from "../reducers/paymentReducer";

const configureStore = () => {
    const store = createStore(
        combineReducers({
            customer: userReducer,
            products: productsReducer,
            cart: cartReducer,
            supplierLogin: supplierLoginReducer,
            paymentData: paymentReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
};

export default configureStore;