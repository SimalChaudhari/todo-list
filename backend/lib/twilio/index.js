'use strict';

const rollbar = require('../../config/rollbar');

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendTwilioOtp = async ( mobileno) => {
    try {
       const data =  await client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({sendDigits: '6',   to: `+${mobileno}`, channel: 'sms'});
       if(data  && data.error  && data.error ){
           return  { error : true , message :"Unable to send otp"}
       }
       if(data ){
           //  +     
        return  {error : false , message :"Otp sent successfully ", data};
       }
    }
    catch (error) {
        rollbar.log(error.message)
        return { error: true , message : "Unable to send otp"};
    }
}

const verifyTwilioOtp = async ( mobileno, otp) => {
    try {
        console.log(mobileno, otp);
      const data  =  await  client.verify.services(process.env.TWILIO_SERVICE_ID).verificationChecks.create({
                to: `+${mobileno}`,
                code: otp
            })

            if(data.status === "approved"){
                return  { error : false , message :"Otp veryfication done successfully", data :  data};
            }
            else{
                 return { error : true , message : "Enter valid otp" };
            }
    }
    catch (error) {
        console.log(error);
        rollbar.log(error.message)
        return { error: true, message : "Unable to verify otp"};
    }
}

module.exports  =  {

    sendTwilioOtp ,
    verifyTwilioOtp
}