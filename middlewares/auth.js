const {getUser}=require("../service/auth")


function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookie?.token;
    req.user=null;
    if(!tokenCookie)
        return next();
    const token =tokenCookie;
    const user= getUser(token);
    req.user=user;
    return next();
}


function restrictTo(roles=[ ]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.res.role)) return res.end("unauthorized");
        return next();
    };
}

// async function restrictToLoggedinUserOnly(req,res,next){
//     const useruid=req.header["authorization"];
//     if(!useruid) return res.redirect("/login");
//     const token=userUid.split('Bearer ')[1];

//         const user=getUser(token);

//         if(!user)return res.redirect("/login")
//             req.user=user;
//         next();
// }

// async function checkAuth(req,res,next){
//     console.log(req.headers);
//     const userUid=req.headers["authorization"];
//       const token=userUid.split('Bearer ')[1];

//       const user=getUser(token);
//       req.user=user;
//       next();
// }
module.exports={
 
    checkForAuthentication,
    restrictTo,
}