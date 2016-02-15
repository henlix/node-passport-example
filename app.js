var express = require('express');
var path = require('path');

var logger = require('morgan');

var body = require('body-parser');

var cookie = require('cookie-parser');
var session = require('express-session');


var passport = require('passport');
var auth = require('./config/auth');
auth(passport);

var mongoose = require('mongoose');
mongoose.connect(require('./config/mongo').url);

var app = express();

app.set('etag', false);
app.use(logger('dev'));

app.use(body.json());
app.use(body.urlencoded({ extended: false }));

app.use(cookie());
app.use(session({

    secret : 'hello, session secret',
    saveUninitialized : false,
    resave : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.use(function (req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;

    next(err);
});

app.use(function (err, req, res) {

    var message = { message : err.message };
    message.error = app.get('env') === 'development' ? err : undefined;

    res.status(err.status || 500).json(message);
});

module.exports = app;
