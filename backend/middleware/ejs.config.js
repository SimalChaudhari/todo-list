const express = require('express');
var cookieParser = require('cookie-parser');

module.exports = app => {
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}));
    const path = require('path');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
};
