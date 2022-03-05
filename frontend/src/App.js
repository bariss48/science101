import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import {loadUser} from './actions/userActions'
import store from './store'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
//ADMIN
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import All_Users from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews';
import Authors_Page from './components/admin/Authors';
//AUTHOR

function App() {
  
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
     store.dispatch(loadUser())
     async function getStripeApiKey() {
       const {data} = await axios.get('/api/v1/stripeapi');
       setStripeApiKey(data.stripeApiKey)
     }
     getStripeApiKey();
  },[])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} /> 
            {stripeApiKey &&      
            <Route path="/payment" 
            element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment/>
            </Elements>
            } 
            />
          }          
            <Route path="/blog/:id" element={<ProductDetails />} exact/>
            <Route path="/login" element={<Login/>} />
            <Route path="/authors" element={<Authors_Page/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/password/forgot" element={<ForgotPassword/>} />
            <Route path="/password/reset/:token" element={<NewPassword/>} />
            <Route path="/me" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}></Route>
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}></Route>
            <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}></Route>
            <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}></Route>
            <Route path="/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}></Route>
            <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>        
            <Route path="/admin/blogs" isAdmin={true} element={<ProtectedRoute><ProductsList/></ProtectedRoute>}></Route>        
            <Route path="/admin/product" isAdmin={true} element={<ProtectedRoute><NewProduct/></ProtectedRoute>}></Route>        
            <Route path="/admin/product/:id" isAdmin={true} element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}></Route>        
            <Route path="/admin/users" isAdmin={true} element={<ProtectedRoute><All_Users/></ProtectedRoute>}></Route>        
            <Route path="/admin/user/:id" isAdmin={true} element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}></Route>        
            <Route path="/admin/reviews" isAdmin={true} element={<ProtectedRoute><ProductReviews/></ProtectedRoute>}></Route>        
            </Routes>
        </div>     
        <Footer />
      </div>
    </Router>
  );
}

export default App;
