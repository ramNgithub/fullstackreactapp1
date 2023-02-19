const express=require("express")
const {NoteModel}=require("../models/Note.module");


const noteRouter=express.Router()

noteRouter.get("/",async (req,res)=>{
    try {
        const allNotes=await NoteModel.find()
        res.send(allNotes)
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

noteRouter.post("/create",async (req,res)=>{
    const payload=req.body
       try {
        const newNote= new NoteModel(payload)
        await newNote.save();
        res.send("new user created")
       } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
       }
    
})

noteRouter.patch("/update/:id",async (req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
     try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Note has been updated")
        }
        
     } catch (err) {
        res.send({"msg":"somthing went wrong","error":err.message})
     }
    
})

noteRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id;
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
     try {
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("Note has been deleted")
        }
        
     } catch (err) {
        res.send({"msg":"somthing went wrong","error":err.message})
     }
})

module.exports={
    noteRouter
}

// {
//     "title":"React",
//     "body":"Learn React",
//     "category":"learning",
//     "author":"Ram"
// }