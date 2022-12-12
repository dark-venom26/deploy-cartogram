import {combineReducers} from 'redux';
import { allReviewsReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, reviewsReducer } from './productReducer';
import {allTodaysUsersReducer, allUsersReducer, passwordReducer, updateUserReducer, userDetailsReducer, userReducer} from './userReducer';
import {toggleSidebarReducer} from './toggleSidebarReducer';
import { profileReducer } from './profileReducer';
import { cartReducer } from './cartReducer';
import { allOrdersReducer, allTodaysOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './orderReducer';

const reducers = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    sidebar: toggleSidebarReducer,
    profile: profileReducer,
    password: passwordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    allTodaysOrders: allTodaysOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    allTodaysUsers: allTodaysUsersReducer,
    userDetails: userDetailsReducer,
    updateUser: updateUserReducer,
    allReviews: allReviewsReducer,
    reviews: reviewsReducer
});

export default reducers