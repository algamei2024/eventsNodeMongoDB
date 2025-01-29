const express = require("express");
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const User = require("../models/User");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});
var upload = multer({ storage: storage });
//middleware to check if user authenticated
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}
//login user view
router.get('/login', (req, res) => {
    res.render('user/login', {
        error: req.flash("error")
    });
});
//login post request
router.post('/login', passport.authenticate("local.login", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/login",
    failureFlash: true
}));
//sing up form
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error')
    });
});
//sing up post request
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: "/users/profile",
        failureRedirect: "/users/signup",
        failureFlash: true
    })
);
//profile 
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('user/profile', {
        success: req.flash('success')
    });
});
//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
    let newFields = {
        avatar: req.file.filename
    };
    User.updateOne({ _id: req.user._id }, newFields).then((result) => {
        console.log('successfully');
    }).catch((err) => {
        res.redirect('/users/profile');
    });
});
//log out user
router.get('/logout', (req, res) => {
    req.logout;
    res.redirect('/users/login');
});
module.exports = router;