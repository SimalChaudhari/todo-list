
const ServerErrorHandeler = (req, res)=>{
    loggers.error("Internal server error");
    return res.status(500).json("Internal server error");
    
}

const  SuccessHandeler = (res, data, message)=>{
    return res.status(200).json({success: true,messsage, })
}