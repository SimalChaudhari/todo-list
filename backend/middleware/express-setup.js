'use strict';

/**
 * Module dependencies.
 */

const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const { limiter } = require('./rate-limiter');
/**
 * Expose
 */

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(limiter);
  app.use(helmet());
  app.disable('x-powered-by');

  // Compression middleware (should be placed before express.static)
  app.use(
    compression({
      threshold: 512
    })
  );

  app.use(cors({
    origin: '*'
  }
  ));

  // Use winston on production . Configuration pending

  // bodyParser should be above methodOverride
  app.use(
    methodOverride(req => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  if (env === 'development') {
    app.locals.pretty = true;
  }
};
