const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const User = require("../Models/User.js");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.put("/:id", async (req,res) =>{
    //req.body.password = Cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
    try{
        //const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        //    $set: req.body,
        //},{new:true});
        await prisma.user.update({
            where: {
                UserId: req.params.id,
            },
            data: req.body
        });
        res.status(200).json("User updated");
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", async (req,res)=>{
    try{
        //await User.findByIdAndDelete(req.params.id);
        await prisma.user.delete({
            where: {
                UserId: req.params.id
            }
        });
        res.status(200).json("User has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get user
router.get("/find/:id", async (req,res)=>{
    try{
        //const user = await User.findById(req.params.id);
        const user = await prisma.user.findFirst({
            where:{
                UserId: {equals: req.params.id}
            }
        });
        const {password, ...others} = user;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all user
router.get("/", async (req,res)=>{
    try{
        const query = req.query.new;
        //const users = query ? await User.find().sort({_id:-1}).limit(query) : await User.find();
        const users = query ? 
            await prisma.user.findMany({
                orderBy: {
                    createdAt: "asc",
                },
                take: parseInt(query),
            })
        : await prisma.user.findMany();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//get user stats
//router.get("/stats", async (req,res)=>{
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