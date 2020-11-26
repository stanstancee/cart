const express = require('express');
const Cart = require('../Model/cartModel')

function  cartRouter(){
const cartRouter = express.Router()
cartRouter.route('/cart')
.post(function(req,res){
//create a new model
const cart= new Cart(req.body);
// check if id is included which is required
if(!req.body.id){
    res.status(404);
    return res.send("id is required")
}
  cart.save((err,doc)=>{
       if(err){
           return(`There was an error saving your document ${err}`)
       }
       res.send(doc);
   })
  res.status(200);
}


)
.get((req,res)=>{
 
  Cart.find({},(err,foundCart)=>{
        if(err){
            res.send(`There was an error finding your document`)
        }
        else{
           return res.json(foundCart)
        }
        
    });
});
cartRouter.use('/card/:cartId', (req, res, next) => {
Cart.findById(req.params.cartId, (err, foundCart) => {
        if (err) {
            return res.send(`You have an error ${err}`);
        }
        if (foundCart) {
            req.foundCart = foundCart;
            return next();
        }
        return res.sendStatus(404);
    })
});

cartRouter.route('/cart/:cartId')
    .get((req, res) =>{ 
        const returnCart = req.foundCart.toJSON();
   
       return  res.json(returnCart)

    }
    )
    .put((req, res) => {
        const {
            foundCart
        } = req;
       foundCart.id=req.body.id
        foundCart.title = req.body.title;
        foundCart.price = req.body.price;
        foundCart.category = req.body.category;
        foundCart.image = req.body.image;
        foundCart.count = req.body.count;
        req.foundCart.save((err) => {
            if (err) {
                return res.sendStatus(500).send(err)
            } else {
                return res.json(req.foundCart)
            }
        })
        return res.status(201).json(foundCart);
    })

    .patch((req, res) => {
        const {
            foundCart
        } = req;
        if (req.body._id) {
            delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
            const key = item[0]
            const value = item[1];
            foundCart[key] = value;
        });
        req.foundCart.save((err) => {
            if (err) {
                return res.sendStatus(500).send(err)
            } else {
                return res.json(req.foundCart)
            }
        })
    })
    .delete((req, res) => {
        req.foundCart.remove(err => {
            if (err) {
                return res.send(err)
            } else {
                return res.sendStatus(204);
            }
        });
    });
return cartRouter
}
module.exports = cartRouter;