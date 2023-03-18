'use strict';
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const handlebars  = require('handlebars');
const { ServerError } = require('../error-handler');
const rollbar = require('../../config/rollbar');
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD // generated ethereal password
    }
});

// send email to 

const sendMail = async (from,to, subject,  templatename , data) => {
    const  templatepath  = path.join(__dirname, "template2", templatename);
    const template = await ejs.renderFile(templatepath, {data});
    let mail = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: template
    };

    try {
        let info = await transporter.sendMail(mail);
    } catch (error) {
        logger.error(error);
    }
};

const howregister  = async (to , data)=>{
    const  templatepath  = path.join( __dirname, "Auth" ,"register.ejs");
    
    const template  = await ejs.renderFile(templatepath , {data});
    let mail ={
        from : process.env.EMAIL,
        to : to,
        subject :"Welcome",
        html :  template
    }

    try{
        let info  = await  transporter.sendMail(mail);
    }
    catch(err){
        rollbar.log(err.message)
        logger.error(err);
    }
}


const sendinvitationmail  = async (to , data, templatename)=>{
    try{
    const  templatepath  = path.join( __dirname ,"template2",templatename);
    const template  = await ejs.renderFile(templatepath , {data});
    let mail ={
        from : process.env.EMAIL,
        to : to,
        subject :"HolyPennies Signup Invitation",
        html :  template
    }

        let info  = await  transporter.sendMail(mail);
    }
    catch(err){
        rollbar.log(err.message)
        logger.error(err);
    }

}


module.exports.sendMail = sendMail;
module.exports.howregister  = howregister;
module.exports.sendinvitationmail  = sendinvitationmail;

