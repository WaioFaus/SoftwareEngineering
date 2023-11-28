const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const Cart = require("../Models/Cart.js");

//create
router.post("/", async (req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/:id", async (req,res) =>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", async (req,res)=>{
    try{
        //await Order.findByIdAndDelete(req.params.id)
        const products = await prisma.cart_Product.findMany({
            select:{
                ProductId: true
            },
            where: {
                CartId: req.params.id,
            }
        });
        if(products){
            await prisma.cart_Product.deleteMany({
                where: {
                    CartId: req.params.id,
                }
            });
        }
        await prisma.cart.delete({
            where: {
                CartId: req.params.id
            }
        });
        res.status(200).json("Cart has been deleted")
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Product
router.get("/find/:userid", async (req,res)=>{
    try{
        const cart = await Cart.findOne({userid: req.params.userid})
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})

////Get all Product

router.get("/", async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;