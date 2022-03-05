const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreateIndex: true
    }).then(res =>{
        console.log(`db connection is success: ${res.connection.host}`)
    })
}

module.exports = connectDatabase