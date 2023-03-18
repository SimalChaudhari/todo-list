'use strict';

const {sequelize }  = require('../../models')
const {Sequelize}  = require('sequelize');
// const host = process.env.DB_HOST;
// const port = process.env.DB_PORT;
const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;



// admin Database connection
async function main(){
  await sequelize.sync({force: true});
}


// Organization Database connection
module.exports =  main();