'use strict';

/**
 * Module dependencies
 */

require('module-alias/register');
require('dotenv').config();
require('../lib/logger/logger');
//this line is to catch syntax error in development
process.on('uncaughtException', (err) => console.log(err));

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
// app.use(express.fo)

/**
 * ejs configration 
*/
require('../middleware/ejs.config')(app);

/**
 * Start Node Server
 */

require('../middleware/start-server')(app);

/**
 * Initialize rollbar
 */
require('../middleware/rollbar')(app);
/**
 * Initialize Express
 */

require('../middleware/express-setup')(app);
require('../middleware/express-router')(app);
require('../middleware/error-handler')(app);

/**
 * Initialize MongoDB Collections
 */

/**
 * Initialize Swagger Docs
 */

// require('../middleware/start-swagger')(app);


module.exports = app;
