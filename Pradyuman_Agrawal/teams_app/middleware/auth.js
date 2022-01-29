const jwt = require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"];
        if(!token)
            return res.status(403).send("Auth token is missing, restricted access");

        const decoded=jwt.verify(token,process.env.TOKEN_KEY);
        req.userId=decoded.userId
        req.email=decoded.email
    }catch(err){
        return res.status(403).json(err);
    }
    return next();
}

module.exports = verifyToken