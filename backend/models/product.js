const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    description_1: {
        type: String,
        required: [true, 'Please enter product description1'],
    },
    description_2: {
        type: String,
        required: [true, 'Please enter product description2'],
    },
    description_3: {
        type: String,
        required: [true, 'Please enter product description3'],
    },
    description_4: {
        type: String,
        required: [true, 'Please enter product description4'],
    },
    description_5: {
        type: String,
        required: [true, 'Please enter product description4'],
    },
    blog_intro: {
        type: String,
        required: [true, 'Please enter intro'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this blog'],
        enum: {
            values: [
                'Science',
                'Math',
                'Physics',
                'Biology',
                'Chemistry',
                'Software',
                'Computer Science',
                'Electronics',                
            ],
            message: 'Please select correct category for blog'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
     reviews: [
          {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },   
           name :{
               type:String,
               required: true
           },
           rating: {
               type:Number,
               required:true,
           },
           comment: {
               type: String,
               required: true
           }
        }    
     ],
     user: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: true
     },
     createdAt:{
         type:Date,
         default:Date.now
     },
     Read_Time:{
       type: Number
    }
})

module.exports = mongoose.model('Product',productSchema);