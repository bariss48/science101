import React from 'react'
import {Link} from 'react-router-dom'

const Stories = ({product, col}) => {
    return (
      <div class="card">
      <Link to={`/product/${product._id}`}>       
      <a href="post.html">
		<img class="img-fluid" src={product.images[0].url} alt="">
        </img>
	  </a>
      </Link>       
        <div class="card-block">
        <h2 class="card-title">
          <a href="post.html">Autumn doesn't have to be nostalgic, you know?</a>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h2>
           <h4 class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h4>
           <div class="metafooter">
           <div class="wrapfooter">
           <span class="meta-footer-thumb">
               <img class="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal">
               </img> 
       </span>
               <span class="author-meta">
               <span class="post-name"><a href="author.html">Steve</a></span><br/>
               <span class="post-date">22 July 2017</span><span class="dot"></span><span class="post-read">6 min read</span>
               </span>
               <span class="post-read-more"><a href={`/product/${product._id}`} title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a>
               
               </span>
         </div>
       </div>
     </div>
       </div>
    )
}

export default Stories