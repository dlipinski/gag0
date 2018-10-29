/*jshint node: true, esversion: 6, devel: true */

// Express.js app
const express = require('express');
const app = express();

// View engine: PUG
app.set('view engine', 'pug');

// MongoDB configuration
const dbConfig = require('./db.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url, { useNewUrlParser: true});

// Passport.js
const passport = require('passport');
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
const initPassport = require('./passport/init');
initPassport(passport);

// Configuration Express.js app
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Static resources
app.use(express.static('public'));

// Routing
const routes = require('./routes/indexRoutes')(passport);
const post_routes = require('./routes/postRoutes')(passport);
app.use('/', routes);
app.use('/', post_routes);

// HTTP server for app
const server = require('http').createServer(app);

server.listen(3000, () => {
    console.log('Server listening -> http://localhost:3000/');
});