const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require('body-parser');

const cors = require('cors')
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;
const db = mongoose.connect('mongodb+srv://admin-stanley:bonjan1994@cluster0.oqzrt.mongodb.net/Cart?retryWrites=true&w=majority', {
    
  useUnifiedTopology: true,
  useNewUrlParser: true
  
});
const Cart = require('./Model/cartModel')
app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.json())
const cartRoute = require('./routes/cartRoutes')(Cart)
app.use('/api',cartRoute);
app.listen(port,()=>{
    console.log("sucess")
})