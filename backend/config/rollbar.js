var Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: process.env.TOKEN_ROLLBAR, captureUncaught: true,
    captureUnhandledRejections: true
});
module.exports = rollbar;