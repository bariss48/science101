import React, {Fragment, useEffect, useState} from 'react'
import Loader from '../layout/loader'
import Metadata from '../layout/MetaData'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {getProductDetails, clearErrors, newReview} from '../../actions/productActions'
import {addItemToCart} from '../../actions/cartActions'
import ListReviews from '../review/ListReviews'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import {TwitterShareButton, WhatsappShareButton} from 'react-share'
import {TwitterIcon, WhatsappIcon} from 'react-share'

const ProductDetails = () => {
    const [quantity,setQuantity] = useState(1)
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState('');
    
    const {loading, error, product} = useSelector(state => state.productDetails)
    //const  match  = useParams();
    //console.log(params.id);
    //const id = match.params.id;
    const {user} = useSelector(state => state.auth)
    const {error: reviewError, success} = useSelector(state => state.newReview)

    useEffect(() => {
      dispatch(getProductDetails(params.id))
      if(error){
          alert.error(error);
          dispatch(clearErrors())
      }
      if(reviewError){
        alert.error(reviewError);
        dispatch(clearErrors())
      }
      if(success){
         alert.success('Review posted successfully!');
         dispatch({type: NEW_REVIEW_RESET}) 
      }
    },[dispatch, alert, error,reviewError, params.id],success)
    const addToCart = () => {
        dispatch(addItemToCart(params.id,quantity));
        alert.success('Item added')
    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);

    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);    
    }
  
    function setUserRatings() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star,index)=> {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function(e){
                star.addEventListener(e, showRatings);
            })
        })
        function showRatings(e){
            stars.forEach((star,index) => {
                if(e.type === 'click'){
                    if(index < this.starValue){
                        star.classList.add('orange');
                        setRating(this.starValue);
                    }else{
                        star.classList.remove('orange');
                    }
                }
                if(e.type === 'mouseover'){
                        if(index < this.starValue){
                            star.classList.add('yellow');
                        }else{
                            star.classList.remove('yellow');
                        }                    
                }
                if(e.type === 'mouseout'){
                    star.classList.remove('yellow');
                }
            })
        }

    }  


    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', params.id);

        dispatch(newReview(formData));
    }


    return (
        <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
            <Metadata title={product.name} />                
            <div class="container">
            <div class="row">
            <div class="col-md-2 col-xs-12">
			<div class="share">
				<p>
					Share
				</p>
				<ul>
					<li>
					<WhatsappShareButton title={product.title} url={`science-101.com/blog/${product._id}`}>
                        <WhatsappIcon logoFillColor='white' round={true}></WhatsappIcon>
                    </WhatsappShareButton>
					</li>
					<li>
					<TwitterShareButton title={product.title} url={`science-101.com/blog/${product._id}`}>
                         <TwitterIcon logoFillColor='white' round={true}></TwitterIcon>
                    </TwitterShareButton>
					</li>
				</ul>
				<div class="sep">
				</div>
				<p>
					Reviews
				</p>
				<ul>
					<li>
                    <span id="no_of_reviews">({product.numOfReviews})</span><br/>
					<svg class="svgIcon-use" width="29" height="29" viewbox="0 0 29 29"><path d="M21.27 20.058c1.89-1.826 2.754-4.17 2.754-6.674C24.024 8.21 19.67 4 14.1 4 8.53 4 4 8.21 4 13.384c0 5.175 4.53 9.385 10.1 9.385 1.007 0 2-.14 2.95-.41.285.25.592.49.918.7 1.306.87 2.716 1.31 4.19 1.31.276-.01.494-.14.6-.36a.625.625 0 0 0-.052-.65c-.61-.84-1.042-1.71-1.282-2.58a5.417 5.417 0 0 1-.154-.75zm-3.85 1.324l-.083-.28-.388.12a9.72 9.72 0 0 1-2.85.424c-4.96 0-8.99-3.706-8.99-8.262 0-4.556 4.03-8.263 8.99-8.263 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32c0 .07 0 .19.02.37.03.29.1.6.19.92.19.7.49 1.4.89 2.08-.93-.14-1.83-.49-2.67-1.06-.34-.22-.88-.48-1.16-.74z"></path></svg>
					</li>
				</ul>
			</div>
		</div>
		<div class="col-md-8 col-md-offset-2 col-xs-12">
			<div class="mainheading">
				<div class="row post-top-meta">					
					<div class="col-md-10">
                    <Link to={`/authors`}>
                    <a class="link-dark"><h5>Prepared By - (Author) - {product.seller} <a class="btn follow">Follow</a></h5></a> 
                    </Link>                             
                        <span class="author-description">{product.blog_intro}</span>
                        <span class="post-date">{product.createdAt}</span><span class="dot"></span><span class="post-read">{product.Read_Time} min read</span>
					</div>
				</div>
				<h1 class="posttitle">{product.name}</h1>
                <hr/>
                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${(product.ratings/5)*100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                <hr/>
			</div>
                    {product.images && product.images.map(image => (
                            <img className="d-block w-100" src={image.url} alt={product.title}/>
                    ))}
                <br></br>
                <br></br>
			<div class="article-post">
				<p>
                {product.description}
				</p>
                {product.description_1}
				<p>
                {product.description_2}
				</p>
                {product.description_3}
				<p>
                {product.description_4}
				</p>
                <h4>Reference</h4>
				<blockquote>
                {product.description_5}
				</blockquote>
				<p>
				</p>
			</div>
			<div class="after-post-tags">
				<ul class="tags">
                 Category ({product.category})
				</ul>
                {user ?  
                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                            Submit Your Review
                </button> 
                :
                   <div className='alert alert-danger mt-5' type="alert">
                       Login to post your review
                   </div>            
                }               
			</div>
            <div className="row mt-2 mb-5">
                    <div className="rating w-50">
    
                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>
                                        <textarea  value={comment} onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">
                                        </textarea>
                                        <button onClick={reviewHandler}  className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                        {product.reviews && product.reviews.length > 0 && (
                            <ListReviews reviews={product.reviews} />
                            )
                        }
            </div>
		</div>
                
        </div>
        </div>
        
            </Fragment>
        )}
        </Fragment>       
    )
}

export default ProductDetails