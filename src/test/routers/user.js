const {verifyToken, verifyTokenAndAuthorization} = require("./verifyToken.js");
const router = require("express").Router();
const Cryptojs = require("crypto-js");
const User = require("../Models/User.js");

router.put("/:id", verifyTokenAndAuthorization,async (req,res) =>{
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

module.exports = router;