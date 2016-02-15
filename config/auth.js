var User = require('../scheme/user');
var LocalStrategy = require('passport-local');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {

        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function(err, user) {

            done(err, user);
        });
    });

    var strategyOption = {

        usernameField : 'username',
        passwordField : 'password',

        passRegToCallback : true
    };

    passport.use('local-signin', new LocalStrategy(strategyOption, function(username, password, done) {

        console.log("username : ", username, " password : ", password);

        process.nextTick(function () {

            User.findOne({ username: username }, function (err, user) {

                if (err) {

                    return done(err);
                }
                if (!user) {

                    return done(null, false);
                }
                if (user.password != password) {

                    return done(null, false);
                }
                else {

                    return done(null, user);
                }
            });
        });
    }));

    passport.use('local-signup', new LocalStrategy(strategyOption, function(username, password, done) {

        console.log("username : ", username, " password : ", password);

        process.nextTick(function () {

            User.findOne({ username: username }, function (err, user) {

                if (err) {

                    return done(err);
                }
                if (user) {

                    return done(null, false);
                }
                else {

                    var newUser = new User();

                    newUser.username = username;
                    newUser.password = password;

                    newUser.save(function (err) {

                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};