
const mongoose =require("mongoose")

const noteSchema =mongoose.Schema({
     title:String,
     notes:String,
    category:String,
    author:String,
    userId:String
})

const notesModel =mongoose.model('notes',noteSchema)

module.exports ={notesModel}