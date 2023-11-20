const jwt = require("jsonwebtoken");
const Cryptojs = require("crypto-js");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC, (err,user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You're not authenticated!");
    }
}

const verifyTokenAndVendorAuthorization = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.vendor){
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
}

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.admin){
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
}

const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.admin){
            next();
        } else {
            console.log(req.user.admin);
            res.status(403).json("You're not an admin!");
        }
    });
}
const verifyTokenAndVendor = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.vendor || req.user.admin){
            next();
        } else {
            res.status(403).json("You're not a vendor!");
        }
    });
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndVendor,verifyTokenAndVendorAuthorization};