const express = require('express');
const router = express.Router();

module.exports = function(passport){

    /* GET Login Page */
    router.get('/login', function(req, res) {
		if (req.user) {res.redirect('/');}
    	// Display the Login page with any flash message, if any
		res.render('pages/login', { message: req.flash('message') });
    });
	router.get('/signup', (req, res) => {
		if (req.user) {res.redirect('/');}
		res.render('pages/signup');
	});
	return router;
}

const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}