const { notesModel } = require("../model/notes.model");
const express=require('express')
const notesRouter =express.Router();

notesRouter.get("/",async(req,res)=>{
try{
  let data =await  notesModel.find()
  res.send(data)
}catch(err){
  console.log(err)
}

})

notesRouter.post("/create",async(req,res)=>{
    const payload =req.body;
    try{
       const notes =new notesModel(payload)
       await notes.save()
       res.send("Created the note")
    }catch(err){
     console.log(err)
     res.send({"msg":"soething went wrong"})
    }
})


notesRouter.patch("/update/:id",async(req,res)=>{
   const payload =req.body;
     const id =req.params.id;
    //  console.log(id)
  const userId =req.body.userId;
  // console.log("RAHUL",userId)
  const note =await notesModel.findOne({"_id":id})
  // console.log(note)
  try{
    if(note.userId !== userId){
      return res.send("You are not authorised to do it")
  }else{
  const data =  await notesModel.findByIdAndUpdate({"_id":id},payload)
    return res.send("updated")
    console.log(data)
  }
  }catch(err){
    res.send("err")
    console.log({"err":"something went wrong"})
  }
})

notesRouter.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id;
   //  console.log(id)
 const userId =req.body.userId;
 // console.log("RAHUL",userId)
 const note =await notesModel.findOne({"_id":id})
 // console.log(note)
 try{
   if(note.userId !== userId){
     return res.send("You are not authorised to do it")
 }else{
 const data =  await notesModel.findByIdAndDelete({"_id":id})
   return res.send("deleted")
   console.log(data)
 }
 }catch(err){
   res.send("err")
   console.log({"err":"something went wrong"})
 }
})

module.exports={notesRouter}