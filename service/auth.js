const jwt=require("jsonwebtoken");
const secret="shezaaziz"

function setUser(id,user){
return jwt.sign({
   _id:user_id,
   email:user.email,
   
}, secret);
}

function getUser(token){
   if(!token) return null;
   return jwt.verify(token,secret)
}

module.exports={
     setUser,
     getUser,
}