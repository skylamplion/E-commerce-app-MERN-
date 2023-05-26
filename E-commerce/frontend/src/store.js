import {
        legacy_createStore as createStore,
        combineReducers,
        applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, ProductDetailsReducer } from './reducers/productReducers';
import {
        userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer'
import {
        orderCreateReducer,
        orderDetailsReducer,
        orderListMyReducer,
        orderPaidReducer
} from './reducers/orderReducer'

const shippingAddressFromStroage = localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const userInfoFromStroage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

const cartItemsFromStroge = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
//access through the key
const reducer = combineReducers({
        productList: productListReducer,
        productDetails: ProductDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPaidReducer,
        orderListMy: orderListMyReducer,
});
const initialState = {
        cart: { cartItems: cartItemsFromStroge, shippingAddress: shippingAddressFromStroage },
        userLogin: { userInfo: userInfoFromStroage },
};
const middleware = [thunk];
const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)));

export default store;