const express=require("express");
const userRoute=express.Router();
const {UserModel}=require("../models/User.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRoute.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body;
       try {
        bcrypt.hash(pass, 5, async (err, hash)=> {
            if(err){
                console.log(err)
            }else{
                const user= new UserModel({email,pass:hash,name,age})
                await user.save()
                res.send("user has been added")
            }
        });
       } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
       }
})

userRoute.post("/login",async (req,res)=>{
    const {email,pass}=req.body;

    try {
       const user= await UserModel.find({email})
       
       if(user.length>0){
        bcrypt.compare(pass, user[0].pass, (err, result)=> {
            if(result){
                const token = jwt.sign({userID:user[0]._id}, 'masai');
                res.send({"msg":"Logged in successfull",'token':token})
            }else{
                res.send("Wrong cradentials")
            }
        });
        }else{
            res.send("Wrong cradentials")
       }
        
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

module.exports={
    userRoute
}