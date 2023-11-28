const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyTokenAndVendor,verifyTokenAndVendorAuthorization} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const Product = require("../Models/Product.js");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create
router.post("/",verifyToken, async (req,res)=>{
    console.log(req.user);
    const newProduct = req.body;
    newProduct.vendorId = req.user.id
    try{
        await prisma.product.create({
            data: newProduct
        });
        res.status(200).json(newProduct);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//update
router.put("/:id", async (req,res) =>{
    try{
        //const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        //    $set: req.body,
        //},{new:true});
        await prisma.product.update({
            where: {
                ProductId: req.params.id,
            },
            data: req.body
        });
        res.status(200).json("Product updated");
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", async (req,res)=>{
    try{

        //await Product.findByIdAndDelete(req.params.id);
        await prisma.product.delete({
            where: {
                ProductId: req.params.id
            }
        });
        res.status(200).json("Product has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Product
router.get("/find/:id", async (req,res)=>{
    try{
        //const product = await Product.findById(req.params.id)
        const product = await prisma.product.findFirst({
            where:{
                ProductId: {equals: req.params.id}
            }
        });
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all Product
router.get("/", async (req,res)=>{
    const qNew = req.query.new;
    console.log(req.query);
    //const qCategory = req.query.category;
    try{
        var products = [];
        if(qNew){
            products = await prisma.product.findMany({
                orderBy:{
                    createdAt: 'desc'
                },
                take: parseInt(qNew)
            });
        }
    //    else if(qCategory){
    //        products = await Product.find({
    //            categories:{
    //                $in: [qCategory],
    //            },
    //        });
    //    }
        else{
            products = await prisma.product.findMany();
        }
        
        res.status(200).json(products);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

////get user stats
//router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
//    const date = new Date();
//    const lastYear = new Date(date.setFullYear(date.setFullYear() - 1));
//    try{
//        const data = await User.aggregate([
//            {$match:{createdAt:{$gte:lastYear}}},
//            {
//                $project:{
//                    month: {$month:"$createdAt"},
//                },
//            },
//            {
//                $group:{
//                    _id: "$month",
//                    total: {$sum: 1},
//                }
//            }
//        ]);
//        res.status(200).json(data);
//    }catch(err){
//        res.status(500).json(err);
//    }
//})

module.exports = router;