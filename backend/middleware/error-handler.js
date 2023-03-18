'use strict';

/**
 * Module dependencies.
 */

const errorHandler = require('errorhandler');
const notifier = require('node-notifier');

module.exports = app => {

  if (process.env.NODE_ENV === 'development') {
    // only use in development env
    // app.use(errorHandler({log: errorNotifier}));
  }

  // function errorNotifier(err, str, req, next) {
  //   const title = 'Error in ' + req.method + ' ' + req.url;
  //   notifier.notify({
  //     title: title,
  //     message: str
  //   });
  //     next();
  // }
};
