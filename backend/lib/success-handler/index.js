const status = require('../statusCodes/statuscodes');
const saveSuccessLogs=require('../../util/saveSuccessLogs')

const ApiCreated = (res, data)=>{
    return res.status(status.API_CREATED.code).json({success: true , message : status.API_CREATED.message, data });
}


const ApiSuccess  = (res,data,req=null)=>{
    
    res.status(status.API_SUCCESS.code).json({success: true, message: status.API_SUCCESS.message, data});
    if(req!==null){
        saveSuccessLogs(req,status.API_SUCCESS.message);
    }
    return;
}

module.exports  ={ApiCreated, ApiSuccess};
