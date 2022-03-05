import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer, productDetailsReducer,productReducer, newReviewReducer,newProductReducer,productReviewsReducer,reviewReducer} from './reducers/productReducers'
import {authReducer, userReducer, forgotPasswordReducer,allUsersReducer, userDetailsReducer} from './reducers/userReducers';
import {cartReducer} from './reducers/cartReducers'
import {newOrderReducer} from './reducers/orderReducers'
import {authorsReducer} from './reducers/authorReducers'

const reducer = combineReducers ({
   authors: authorsReducer,
   newProduct: newProductReducer,
   products: productsReducer,
   product: productReducer,
   productDetails: productDetailsReducer,
   productReviews: productReviewsReducer,
   review: reviewReducer,
   auth: authReducer,
   user: userReducer,
   allUsers: allUsersReducer,
   forgotPassword: forgotPasswordReducer,
   cart : cartReducer,
   newOrder: newOrderReducer,
   newReview: newReviewReducer,
   userDetails: userDetailsReducer
})

let initialState = {
   cart: {
      cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      shippingInfo: localStorage.getItem('shippingInfo') 
          ? JSON.parse(localStorage.getItem('shippingInfo'))
          : {}
   }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;