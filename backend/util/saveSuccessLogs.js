const { howadminlogdb,donorlogdb} = require("../models");
function savelogs(req,message){
    const user=req.user || null;
    let data={
        status:"SUCCESS",
        message:message,
        data:{
            url:req.originalUrl,
            method:req.method
        }
        };
    if(user==null){
        // if not user dont save simply return
        return ;
    }
    const userType=user.userType
    if(userType==='how'){
    const adminId=user.howadminid || null;
    data.howadminid=adminId
    data.activity=user.activity || null;
    return howadminlogdb.create(data).then(data => console.log("logs saved successfully")).catch(err => console.log(err));
    }
    else if(userType==='donor'){
        const donorId=user.donorid || null;
        data.donorid=donorId
        data.activity=user.activity ||null;
        return donorlogdb.create(data).then(data => console.log("logs saved successfully")).catch(err => console.log(err));
        }
    return;
}
module.exports=savelogs;