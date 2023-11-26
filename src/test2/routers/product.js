const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyTokenAndVendor,verifyTokenAndVendorAuthorization} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const Product = require("../Models/Product.js");

//create
router.post("/", async (req,res)=>{
    const newProduct = new Product(req.body);
    newProduct.vendorId = req.user.id
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/:id", async (req,res) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", async (req,res)=>{
    try{

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Product
router.get("/find/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all Product
router.get("/", async (req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }
        else if(qCategory){
            products = await Product.find({
                categories:{
                    $in: [qCategory],
                },
            });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
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