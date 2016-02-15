var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/success', function(req, res) {

    res.send("Success :D");
});

router.get('/failure', function(req, res) {

    res.send("Failure :(");
});

router.post('/signin', passport.authenticate('local-signin', {

    successRedirect: '/success',
    failureRedirect: '/failure'
}));

router.post('/signup', passport.authenticate('local-signup', {

    successRedirect: '/success',
    failureRedirect: '/failure'
}));

module.exports = router;
