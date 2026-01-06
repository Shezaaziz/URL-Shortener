const {getUser}=require("../service/auth")

async function restrictToLoggedinUserOnly(req,res,next){
    const useruid=req.header["authorization"];
    if(!useruid) return res.redirect("/login");
    const token=userUid.split('Bearer ')[1];

        const user=getUser(token);

        if(!user)return res.redirect("/login")
            req.user=user;
        next();
}
module.exports={
    restrictToLoggedinUserOnly,
}