const express=require("express");
const{handleGenerateNewShortUrl}=require("../controllers/url")
const router=express.Router();

router.post("/",handleGenerateNewShortUrl);


router.get("/:id",(req,res)=>{
    console.log("redirect to original link");
})


router.get("/url/analytics/:id",(req,res)=>{
  console.log("clicks for short url");
})


module.exports=router;