const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path')
//ROUTES
//const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

const products = require('./routes/product');
const authors = require('./routes/authors');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');
//errors import
const errorMiddleware = require('./middlewares/errors');

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(fileUpload())
//cloudinary

//import api's
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1',payment);
app.use('/api/v1',order);
app.use('/api/v1', authors);
// handle the errors with middleware
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


app.use(errorMiddleware)
module.exports = app;
