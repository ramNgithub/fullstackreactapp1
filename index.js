const express=require("express")
const {connection}=require("./config/db");
const {userRoute}=require("./routes/users.route")
const {noteRouter}=require("./routes/notes.route")
const {authenticate}=require("./Middelwares/authonticate.middelware")
require("dotenv").config()
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRoute)
app.use(authenticate)
app.use("/notes",noteRouter)
app.listen(process.env.port,async ()=>{
      try {
        await connection
        console.log(`Connected to DB at port ${process.env.port}`)
      } catch (err) {
        console.log("something went wrong")
      }
})