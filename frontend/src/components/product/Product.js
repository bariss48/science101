import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product, col}) => {
    return (
      <div class="card">
      <div class="row">
      <div class="col-md-5 wrapthumbnail">
      <Link to={`/blog/${product._id}`}>       
      <div class="thumbnail" style={{backgroundImage: `url(${product.images[0].url})`}}>        
         </div>
         </Link>       
         </div>                 
         <div class="col-md-7">
           <div class="card-block">
        <h2 class="card-title">
          <Link to={`/blog/${product._id}`}>{product.name}</Link>
        </h2>
    <h4 class="card-text">{product.blog_intro}</h4>
           <div class="metafooter">
           <div class="wrapfooter">
           <span class="meta-footer-thumb">               
           </span>
               <span class="author-meta">
               <Link to={`/blog/${product._id}`}>
               <span class="post-name"><a>Author ({product.seller}) </a> -- Category ({product.category})</span><br/>
               <span class="post-date">{product.createdAt}</span><span class="dot"></span><span class="post-read">{product.Read_Time} min read</span>
               </Link>                             
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
    )
}

export default Product