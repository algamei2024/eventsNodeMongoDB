const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");
const flash = require("connect-flash");
const db = require('./config/database');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
//bring ejs template
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
//bring static


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('uploads'));
//session and flash config
app.use(session({
    secret: "algamei-ones",
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:60000 * 15}
}));
app.use(flash());
//brin passport 
app.use(passport.initialize());
app.use(passport.session());
//===store user object
app.use('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})
//=
app.get('/', (req , res) => {
    res.redirect('/events');
});
//========================
//عمل راوت ومسكه بملف باسم ايفنت
const events = require('./routes/event-routes');
app.use('/events', events);
//========================
const users = require('./routes/user-routes');
app.use('/users', users);
//========================
app.listen(3000, () => {
    console.log('app is working on port 3000');
});