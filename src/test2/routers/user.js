const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const User = require("../Models/User.js");

router.put("/:id", async (req,res) =>{
    req.body.password = Cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err);
    }
})

//Get user
router.get("/find/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all user
router.get("/", async (req,res)=>{
    try{
        const query = req.query.new;
        const users = query ? await User.find().sort({_id:-1}).limit(query) : await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
})

//get user stats
router.get("/stats", async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.setFullYear() - 1));
    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {
                $project:{
                    month: {$month:"$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1},
                }
            }
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;