const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    category:String,
    userID:String
})

const NoteModel=mongoose.model("reactnote",noteSchema);

module.exports={
    NoteModel
}