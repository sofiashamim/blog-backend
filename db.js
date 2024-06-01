const mongoose = require('mongoose');
require('dotenv').config()

const connectToDb= async()=>{
     mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('error in connecting to mongodb '));
}

module.exports = connectToDb;

// const mongoose = require('mongoose');
// require('dotenv').config()

// const connectToDb= async()=>{
//      mongoose.connect('mongodb://0.0.0.0:27017/test')
//     .then(() => console.log('Connected!'))
//     .catch(() => console.log('error in connecting to mongodb '));
// }

// module.exports = connectToDb;

