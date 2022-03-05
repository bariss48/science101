const Author = require('../models/authors');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// new author to /api/v1/admin/new/author
exports.newAuthor = catchAsyncErrors (async (req, res, next) => {
   const author = await Author.create(req.body)
   res.status(201).json({
     success:true,
     author
   })
})
// get all products => /api/v1/products
exports.getAuthors = catchAsyncErrors (async (req, res, next) => {
   
  const resPerPage = 8;
  const authorsCount = await Author.countDocuments();

  const apiFeatures = new APIFeatures(Author.find(), req.query)
        .search()
        .filter()

  let authors = await apiFeatures.query;
  let filteredAuthorsCount = authors.length;
         
  apiFeatures.pagination(resPerPage);
  authors = await apiFeatures.query.clone();   // Simply add clone like this.
  
  setTimeout(() => {
    res.status(200).json({
      success: true,
      authorsCount,
      resPerPage,
      filteredAuthorsCount,
      authors    
    })
  },700);

})
//get single product detailse => /api/v1/products/:id

exports.getSingleAuthor = catchAsyncErrors (async (req, res, next) => {
  console.log(req.params.id);  
  const author = await Author.findById(req.params.id);
   if(!author){
     return next(new ErrorHandler('product not found', 404));
   }
   res.status(200).json({
     success: true,
     product
   })

})

exports.updateAuthor = catchAsyncErrors (async (req, res, next) => {
 
  let author = await Author.findById(req.params.id);

   if(!author){
    return next(new ErrorHandler('author not found', 404));
   }

   author = await Author.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
     runValidators: true,
   })

   res.status(200).json({
     success: true,
     author   
    })

})

exports.deleteAuthor = catchAsyncErrors (async (req, res, next) => {

    const author = await Author.findById(req.params.id);

    if(!author){
      return next(new ErrorHandler('product not found', 404));
    }

    await author.remove();

    res.status(200).json({
      success: true,
      message: 'deleted item'
    })
})
//Create new review => /api/v1/review

/*
exports.createProductReview = catchAsyncErrors ( async (req, res, next) => {
  const {rating, comment, productId} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }
   const product = await Product.findById(productId);

   const isReviewed = product.reviews.find(
     r => r.user.toString() === req.user._id.toString()
   )
   if(isReviewed){
      product.reviews.forEach(review => {
        if(review.user.toString() === req.user._id.toString()){
           review.comment = comment;
           review.rating = rating;
        }
      })  
   }else{
     product.reviews.push(review);
     product.numOfReviews = product.reviews.length
   }
   product.ratings = product.reviews.reduce((acc, item) => item.rating + acc,0) / product.reviews.length;
   await product.save({validateBeforeSave: false});
   res.status(200).json({
     success: true
   })
})
//get product reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
      success: true,
      reviews: product.reviews
    })
})
//delete product reviews => /api/v1/reviews
exports.deleteReview = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.productId.toString());
  const numOfReviews = reviews.length;
  const ratings = product.reviews.reduce((acc, item) => item.rating + acc,0) / reviews.length;
  
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  },{
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    })
})
*/