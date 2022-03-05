import React, {Fragment,useState,useEffect} from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import MetaData from '../layout/MetaData'
import Author from '../authors/Author'
import {useDispatch , useSelector} from 'react-redux'
import {getAuthors} from '../../actions/authorActions'
import {useAlert} from 'react-alert'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Loader from  '../layout/loader'

export const Authors = () => {
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
  const {loading, authors, error, authorsCount, resPerPage, filteredProductsCount} = useSelector(state => state.authors)
  const params = useParams();
  const keyword = params.keyword;

  useEffect( () => {
      if(error){
       return alert.error(error)
      }
      dispatch(getAuthors(keyword,currentPage, price, category,rating));      
  }, [dispatch, alert, error,currentPage, keyword, price, category,rating])

  function setCurrentPageNo(pageNumber){
     setCurrentPage(pageNumber)
  }

  let count = authorsCount;
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
                       <h2><span>Authors</span></h2>                                                                 
                      </div>
                      </Fragment>                      
                    )
                  }                   
                  <div class="card-columns listfeaturedtag">
                  <div class="card">
      <div class="row">
      <div class="col-md-5 wrapthumbnail">
      <div class="thumbnail" style={{backgroundImage: `url(https://avatars.githubusercontent.com/u/50153950?v=4)`}}>        
         </div>
         </div>                 
         <div class="col-md-7">
           <div class="card-block">
        <h2 class="card-title">
          <a href='http://bariskara.software'>Berk Barış Kara</a>
        </h2>
    <h4 class="card-text">Greetings from Turkey! I am Baris.I have been interested in computer science for 4 years. I am trying to develop full stack web applications. I am also a computer and software engineer.</h4>
           <div class="metafooter">
           <div class="wrapfooter">
           <span class="meta-footer-thumb">               
           </span>
               <span class="author-meta">
               <span class="post-name"><a>Founder of</a> science-101.com</span><br/>
               <span class="post-date"></span><span class="dot"></span><span class="post-read"> Software Engineer</span>
               </span>
               <span class="post-read-more">
                    <a title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg>
                 </a> 
               </span>
         </div>
       </div>
     </div>
       </div>
     </div>
   </div>
              </div>              
            </section>        
            {resPerPage <= count && (
             <div className="d-flex justify-content-center mt-5">
               <Pagination 
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount = {authorsCount}
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

export default Authors