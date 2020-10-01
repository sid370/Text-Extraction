const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const decoded=jwt.verify(token,"kai78po");
        next();
    }catch(err){
        res.status(401).json({
            status: 401,
            message: "Authorization Failed"
        })
    }
}