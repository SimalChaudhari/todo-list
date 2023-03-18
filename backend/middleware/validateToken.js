const jwt = require('jsonwebtoken');

const validateToken = async (req,res,next)=>{
    const vtoken = req.cookies.auth;
    if (vtoken){
        const decodeData = jwt.verify(vtoken,process.env.LOGIN_SECRET);
        if (decodeData){
            req.authToken = vtoken;
            next();
        } else {
            return res.redirect('/api/auth/login');
        }
    } else {
        return res.redirect('/api/auth/login');
    }

};
module.exports = validateToken;
