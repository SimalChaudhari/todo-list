const jwt = require('jsonwebtoken');
const {UnAuthorize} = require('../lib/error-handler');
const jwtauthorization = (req,res , next)=>{
    const authheader = req.headers.authorization;
    if (authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, user)=>{
            if (err) {
                res.status(500).json({message:"token expire"})
            }
            // query
            
            req.user = user;
        
            next();
        });
    } else {
        res.status(500).json({success: false , error: {details:[{message:"token expired"}]}})
    }
    
};


module.exports  = { jwtauthorization};
