const log4js = require('log4js');
const logJson = require('../../config/json/log4js.json');

/**
 * Initialise log4js first, so we don't miss any log messages
 */
log4js.configure(logJson);


global.logger = log4js.getLogger();