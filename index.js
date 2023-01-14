const express= require("express")
const app =express()
const {connection} =require('./configs/db')
const {notesRouter}=require("./routes/notes.router")
const {userRouter}=require("./routes/user.routes")
const {authenticate}=require("./middleware/authenticated.middleware")
var cors = require('cors')
require('dotenv').config()

app.use(express.json())
// app.use(cors({
//     origin:"*",
// }))
app.use(cors())

app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",notesRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`port runing mine at ${process.env.port}`)
        console.log("connected to db") 
    }catch(err){
        console.log(err)
        console.log("trouble in connected to db")
    }
  
})