const router = require("express").Router();
const User = require("../Models/User.js");
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Register
router.post("/register", async (req,res)=>{

    //const newUser = new User({
    //    username: req.body.username,
    //    email: req.body.email,
    //    password: Cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    //});

    try{
        //const savedUser = await newUser.save();
        //console.log(savedUser);
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password //Cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
            },
        });
        res.status(201).json(user);
    } catch (err) {
        try{
            console.log(500).json(err);
        }catch(err){
            console.log(err);
        }
    }
})

router.post("/login",async (req,res)=>{
    try{
        //const user = await User.findOne({username: req.body.username});
        const user = await prisma.user.findFirst({
            where:{
                username: {equals: req.body.username},
            },
        });
        !user && res.status(401).json("Wrong username");
        console.log(user);

        //const hashedPassword = Cryptojs.AES.decrypt(user.password,process.env.PASS_SEC);
        //const Orgpassword = hashedPassword.toString(Cryptojs.enc.Utf8);
        if(user.password != req.body.password){
            res.status(401).json("Wrong password");
        } 

        const accessToken = jwt.sign({
            id: user.UserId,
            admin: user.isAdmin,
        },
        process.env.JWT_SEC,{expiresIn:"3d"});    
        try{
            const {password, ...others} = user;
            res.status(200).json({...others, accessToken});
        } catch(err) {
            console.log(err);
        }
    } catch(err){
        try{
            res.status(500).json(err);
        }catch(err){}
        console.log(err);
        console.log("Error at auth");
    }
})

module.exports = router