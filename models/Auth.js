const mongoose = require('mongoose');
let AuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        default:"",
    },
},{timestamps:true})

module.exports =mongoose.model('auth',AuthSchema)