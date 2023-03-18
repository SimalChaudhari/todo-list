const toobusy  = require('toobusy-js');

module.exports  = (req, res ,next)=>{
    if(toobusy()){
        return res.status(503).json({message:"Server too busy..."})
    }
    else{
        next();
    }

}