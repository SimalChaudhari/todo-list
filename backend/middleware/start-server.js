'use strict';

const http = require('http');
const port = process.env.PORT || 9000;
module.exports = app => {

    function listen() {
        app.set('port', port);
        const server = http.createServer(app);
        server.listen(port);
        console.log('Express app started on port ' + port);
    }
    function dbError(err) {
        logger.error('mysql connection error:', err);
    }
    listen();
    console.log("app started ");
};
