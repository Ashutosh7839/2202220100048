const express = require("express")


const app = express();
const cors = require("cors")
const userRouter = require("./router/user.router");
const mongoose = require("mongoose")


const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use("/api",userRouter)
app.get('/test',(req,res)=>{
    res.send("welcome")
})




app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})

mongoose.connect("mongodb+srv://ashutoshverma7839:ashutosh123@cluster0.gwejtav.mongodb.net/").then(db=>{
    console.log("mongodb connnected")
})