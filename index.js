const express=require("express");
const {connectMongodb}=require("./connections");
const URL = require("./models/url")
const urlRoute=require("./routes/url");
const app=express();

const port=8001;

connectMongodb("mongodb://localhost:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url",urlRoute);


app.get("/:shortId",async(req,res)=>{
 const shortId=req.params.shortId;


 const entry= await URL.findOneAndUpdate(
 {
shortId
},{ 
    $push:{
    visitHistory:{
        timestamp:Date.now(),
    }

},
},
 { new: true } 
);
res.redirect(entry.redirectURL);
});



app.listen(port,()=>console.log(`server started at port:${port}`) )