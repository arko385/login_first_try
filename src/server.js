// import the express module and app is use to access all the express()
const express=require("express");
const app=express();
//const bodyParser=require("body-parser");
//const path=require("path");
app.use(express.json());

// To avoid proxy errors
const cors=require("cors");
app.use(cors());

//require("./db/conn");
// import the mongoose module
const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
// connect with the database
mongoose.connect("mongodb://localhost:27017/mydb").then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
})

const port=process.env.port ||5000;
//const static_path=path.join(__dirname,"../public");



const db=mongoose.connection;
// api
app.post("/register",async(req,res)=>{
    const {name,email,mobile,password}=req.body;
    const data={
        "name" : name ,
        "email" : email ,
        "mobile" : mobile ,
        "password" : password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err)
        {
            throw err;
        }
        console.log("Record inserted successfully");
    });

})
//login 
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    console.log("hi");
    db.collection('users').findOne({ email:email},(err,user)=>{
        if(user)
        {
            if(password===user.password)
            {
                alert(`login ram Successful ${user.email}`);
                res.send({message:"login ramji succeessful",user:user})
            }
            else
            {
                res.send({message:"password didn't match"})
            }

        }
        else
        
        {
            res.send({message:"user didn't recognised"})
        }
        //console.log("Record inserted successfully");
    });

})
//api sign in




app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
    
})
