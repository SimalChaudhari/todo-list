const express = require('express');
const rollbar=require('../config/rollbar');
module.exports = app => {
      app.use(rollbar.errorHandler());
};