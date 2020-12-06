//import mongoose
const mongoose = require('mongoose');
//destructure mongoose object and get schema
const { Schema } = mongoose ;
//create new schema
const cartModel = new Schema({
    user:{type:String},
    title:{type:String},
    price:{type:Number},
    category:{type:String},
    image:{type:String},
    count:{type:Number}


});

//export schema
module.exports = mongoose.model("cart",cartModel)