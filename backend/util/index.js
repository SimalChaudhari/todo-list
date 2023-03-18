const jwtsimple = require('jwt-simple');
const jwt  = require('jsonwebtoken');
const fs = require('fs');
const path  = require('path');
const { ServerError } = require('../lib/error-handler');


const resetdetails   =(email, secret)=>{  
  // get currunt time and add 24 hourse time it five us the expire time of the token
    const token  =  jwt.sign({email: email} ,  secret);
    return  {token};
}

const generaterefercode  = (name) => {
    var time = new Date().getTime();
    let length  = time.toString().length;
    let refercode = `${name}${time.toString().slice(length-7)}`;
    refercode = refercode.replace(/ /g,""); 
    return refercode;
}

module.exports = { resetdetails, generaterefercode };
