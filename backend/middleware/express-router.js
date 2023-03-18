'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const router = express.Router();
const appRouter = require('@api/routes');
const statusMonitor = require('express-status-monitor')();
const BusyMiddleware = require('./too-busy');
const rollbar = require('../config/rollbar');

/**
 * Expose
 */

module.exports = app => {
  app.use(statusMonitor);

  router.get('/', (req, res, next) => {
    try {
      res.send('Server');
    } catch (e) {
      rollbar.log('err in / path')
      logger.error(e, 'err in / path');
      next(e);
    }
  });

  app.use('/api/v2', BusyMiddleware, appRouter);

};
