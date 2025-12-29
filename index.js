const express=require("express");
const {connectMongodb}=require("./connections");
const urlRoute=require("./routes/url")
const app=express();

const port=8001;

connectMongodb("mongodb://localhost:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url",urlRoute);

app.listen(port,()=>console.log(`server started at port:${port}`) )