import React, {Fragment,useState,useEffect} from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import {useDispatch , useSelector} from 'react-redux'
import {getProducts} from '../actions/productActions'
import {useAlert} from 'react-alert'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Loader from  './layout/loader'

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)

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
  const {loading, products, error, productsCount, resPerPage, filteredProductsCount} = useSelector(state => state.products)
  const params = useParams();
  const keyword = params.keyword;

  useEffect( () => {
      if(error){
       return alert.error(error)
      }
      dispatch(getProducts(keyword,currentPage, price, category,rating));      
  }, [dispatch, alert, error,currentPage, keyword, price, category,rating])

  function setCurrentPageNo(pageNumber){
     setCurrentPage(pageNumber)
  }

  let count = productsCount;
  if(keyword){
    count = filteredProductsCount
  }    
    return (
        <Fragment>      
           <li class="nav-item">
  <div class="dropdown">
   <a class="nav-link">Blog-Categories
   </a>
   <div class="dropdown-content">
   <ul className="pl-0">           
        {categories.map(category =>(
            <a >
            <li
            style={{cursor: 'pointer',
             listStyleType: 'none'
             }}
             key={category}
             onClick={() => setCategory(category)}
             >
             {category}
            </li>  
            </a>   
             ))}                   
        </ul>            
    </div>
    </div>
 </li>    
            {loading ?  <Loader/> : (
              <Fragment>
                <MetaData title={'Blogs'} />
                <div class="container">                  
	                 <div class="mainheading">
                    <h1 class="sitetitle">Science-101</h1>
		               <p class="lead">
                     Science for technology , innovation and people.
		               </p>                   
	                </div>                  
                  <section class="featured-posts">                    
                  {keyword ? (
                    <Fragment>                                                   
                        <div class="section-title">
		                     <h2><span>Results</span></h2>
	                    </div>
                    </Fragment>
                  ):
                    (
                      <Fragment>                                                   
                      <div class="section-title">
                       <h2><span>Featured</span></h2>                                                                 
                      </div>
                      </Fragment>                      
                    )
                  }                   
                  <div class="card-columns listfeaturedtag">
                  {keyword ? (
                    <Fragment>                                                                         
                          { products && products.map(product => (    
                            <Product key={product._id} product={product} col={4}/>
                            )) }
                    </Fragment>
                  ): (
                    products && products.map(product => (    
                      <Product key={product._id} product={product} col={3} />
                     ))    
                  )}                    
              </div>              
            </section>        
            {resPerPage <= count && (
             <div className="d-flex justify-content-center mt-5">
               <Pagination 
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount = {productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText = {'Next'}
                  prevPageText = {'Prev'}
                  firstPageText = {'First'}
                  lastPageText = {'Last'}
                  itemClass="page-item"
                  linkClass="page-link"
                />                
             </div>             
             )}   
            </div>   
              </Fragment>
            )}            
     </Fragment>       
    )
}

export default Home