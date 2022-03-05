const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    description_1: {
        type: String,
        required: [true, 'Please enter product description1'],
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
     createdAt:{
         type:Date,
         default:Date.now
     },
})

module.exports = mongoose.model('Author',authorSchema);