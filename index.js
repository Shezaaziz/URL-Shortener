const express=require("express");
const path=require("path");
const {connectMongodb}=require("./connections");
const staticRoute=require("./routes/staticRouter");
const URL = require("./models/url")
const urlRoute=require("./routes/url");
const app=express();

const port=8001;

connectMongodb("mongodb://localhost:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url",urlRoute);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use("/",staticRoute);
app.get("/:shortId",async(req,res)=>{
 try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.listen(port,()=>console.log(`server started at port:${port}`) )