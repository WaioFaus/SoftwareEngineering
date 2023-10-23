const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routers/user.js");
const authRoute = require("./routers/auth.js");
const exp = require("constants");

mongoose.connect(process.env.MONGOO_URL)
    .then(()=>console.log("DB console connection successfull"))
    .catch((err) => {console.log(err)});

app.use(express.json());

//app.get("/api/test", () => {
//    console.log("GET test successfull");
//});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(5000, ()=>{
    console.log("Backend server is running");
});