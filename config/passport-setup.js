const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, false);
    });
});
// Register Strategy
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
}, (req, username, password, done) => {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'password does not match'));
    }
    else {
        User.findOne({ email: username }).then((result) => {
            if (result) {
                return done(null, false, req.flash('error', 'Email Already used'));
            }
            else {
                let newUser = new User();
                newUser.email = req.body.email;
                newUser.password = newUser.hashPassword(req.body.password);
                newUser.avatar = "profile.png";
                newUser.save().then((user) => {
                    return done(null, user, req.flash('success', 'User added'));
                }).catch((error) => {
                    console.log('error in insert new user');
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}));

//Login Strategy

passport.use("local.login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback:true
}, (req, username, password, done) => {
    User.findOne({ email: username }).then((user) => {
        if (user) {
            if (user.comparePassword(password, user.password))
            {
                return done(null, user, req.flash("success", "welcome back"));
            }
            else {
                return done(null, false, req.flash("error", "password is not correct"));  
            }
        }
        else {
           return done(null,false,req.flash("error","User not found"))
        }
    }).catch((err) => {
        return done(null, false, req.flash("error", "Something wrong happened"));
    });
}));