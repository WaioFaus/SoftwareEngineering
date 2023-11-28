const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const Order = require("../Models/Order.js");
const { PrismaClient } = require('@prisma/client');
const Product = require("../Models/Product.js");
const prisma = new PrismaClient();

//create
router.post("/",verifyToken, async (req,res)=>{
    const newOrder = req.body;
    const products = newOrder.products;
    
    try{
        const order = await prisma.order.create({
            data:{
                UserId: req.user.id,
                address: newOrder.address,
            },
        });

        products.forEach(element => {
            element.OrderId = order.OrderId;
        });
        const product_Order = await prisma.order_Product.createMany({
            data: products,
        });
        //const savedOrder = await newOrder.save();
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//update
router.put("/:id",verifyToken, async (req,res) =>{
    try{
        //const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        //    $set: req.body,
        //},{new:true});
        const {products, ...others} = req.body;
        await prisma.order.update({
            where:{
                OrderId: req.params.id
            },
            data: others,
        })
        if(products){
            products.forEach(element => {
                element.OrderId = req.params.id
            });
            prisma.$transaction(async(prisma) => {
                try {
                      for (let object of products) {
                        await prisma.order_Product.upsert({
                          where: {
                            OrderId_ProductId: {
                                OrderId: object.OrderId,
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
        res.status(200).json("Order updated");
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//Delete
router.delete("/:id",  async (req,res)=>{
    try{
        //await Order.findByIdAndDelete(req.params.id)
        const products = await prisma.order_Product.findMany({
            select:{
                ProductId: true
            },
            where: {
                OrderId: req.params.id,
            }
        });
        if(products){
            await prisma.order_Product.deleteMany({
                where: {
                    OrderId: req.params.id,
                }
            });
        }
        await prisma.order.delete({
            where: {
                OrderId: req.params.id
            }
        });
        res.status(200).json("Order has been deleted")
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Product
router.get("/find/:userid", async (req,res)=>{
    try{
        const orders = await prisma.order.findMany({
            where:{
                UserId: req.params.userid,
            }
        });
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

////Get all Product

router.get("/", async (req,res)=>{
    try{
        const orders = await prisma.order_Product.findMany();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

//get monthly income
//router.get("/income", async (req,res)=>{
//    const date = new Date();
//    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
//    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
//
//    try{
//        const income = await Order.aggregate([
//            {$match: {createdAt: {$gte: previousMonth}}},
//            {
//                $project: {
//                    month: {$month: "$createdAt"},
//                    sales: "$amount",
//                },
//            },
//            {
//                $group:{
//                    _id:"$month",
//                    total: {$sum: "$sales"},
//                },
//            },
//        ]);
//        res.status(200).json(income);
//    } catch(err) {
//        res.status(500).json(err);
//    }
//});
module.exports = router;