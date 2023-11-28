const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const Cart = require("../Models/Cart.js");
const { PrismaClient } = require('@prisma/client');
const { verify } = require("jsonwebtoken");
const prisma = new PrismaClient();

//create
router.post("/", verifyToken, async (req,res)=>{
    const newCart = req.body;
    const CartInf = {UserId: req.user.id};
    const products = newCart.products;
    
    try{
        const cart = await prisma.cart.create({
            data: CartInf,
        });

        products.forEach(element => {
            element.CartId = cart.CartId;
        });
        const product_Cart = await prisma.cart_Product.createMany({
            data: products,
        });

        res.status(200).json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//update
router.put("/:id", verifyToken, async (req,res) =>{
    try{
        const {products, ...others} = req.body;
        await prisma.cart.update({
            where:{
                CartId: req.params.id
            },
            data: others,
        })
        if(products){
            products.forEach(element => {
                element.CartId = req.params.id
            });
            prisma.$transaction(async(prisma) => {
                try {
                      for (let object of products) {
                        await prisma.cart_Product.upsert({
                          where: {
                            CartId_ProductId: {
                                CartId: object.CartId,
                                ProductId: object.ProductId,
                            }
                          },
                          update: {
                            amount: object.amount
                          },
                          create: object,
                        });
                      }
              }catch(err){
                console.log(err);
              }});
        }
        res.status(200).json("Cart updated");
    }catch(err){
        res.status(500).json(err);
        console.log(err);
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