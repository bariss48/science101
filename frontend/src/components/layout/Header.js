import React, {Fragment,useState,useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import {getProducts} from '../../actions/productActions'
import Product from '../product/Product'
import Search from './Search'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useParams} from 'react-router-dom'
import {logout} from '../../actions/userActions'
import '../../App.css'

const Header = () => {  
    const { user, loading } = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.cart)
    const [category, setCategory] = useState('')
    const logoutHandler = () => {
      dispatch(logout())
      alert.success('Logged out successfully!')
    }
    const categories = [
      'Science',
      'Math',
      'Physics',
      'Biology',
      'Chemistry',
      'Software',
      'Computer Science',
      'Electronics',          
    ]  
    const alert = useAlert();     
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.products)
    useEffect( () => {
      if(error){
       return alert.error(error)
      }
      dispatch(getProducts(category));      
  }, [dispatch, alert, category])
    return (
        <Fragment>
        <nav class="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
       <div class="container">    
        <a href='/' class="navbar-brand">
         <img src="/images/atomm.png"/>
        </a>
	     <div class="collapse navbar-collapse" id="navbarsExampleDefault">
		   <ul class="navbar-nav ml-auto">         
			 <li class="nav-item active">
         <Link to='/'>
         <a class="nav-link">Blogs <span class="sr-only">(current)</span></a>
         </Link>
			 </li>			 
			  <li class="nav-item">
        <Link to='/authors'>
			  <a class="nav-link">Authors</a>
        </Link>
			  </li>                           
        {user ? (          
        <li class="nav-item">
        <div class="dropdown">          
        <a class="nav-link"  className="btn dropdown-toggle text-black mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                               
                   <span>                  
                     {user && user.name}</span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropDownMenuButton"> 
                    {user && user.role !== 'admin' ? (
                      <Link className="dropdown-item" to="/">Science-101</Link>
                    ): (
                      <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                    )}
                    <Link className="dropdown-item" to="/me">Profile</Link>
                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                      Logout
                    </Link>
                  </div>                  
                  </div>
                </li>                           
                ): !loading &&
                <li class="nav-item">
                  <Link to='/login'>
                    <a class="nav-link">Login</a>
                  </Link>
                </li>      
              }    
		  </ul>
		  <Search/>
	</div>
 </div>
</nav>
     </Fragment>
    ) 
}

export default Header