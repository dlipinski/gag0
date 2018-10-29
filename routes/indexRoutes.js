const express = require('express');
const router = express.Router();

module.exports = function(passport){

    /* GET Login Page */
    router.get('/login', function(req, res) {
		if (req.user) {res.redirect('/');}
    	// Display the Login page with any flash message, if any
		res.render('pages/login', { message: req.flash('message') });
    });
    
	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: 'login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('pages/register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/account',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/account', isAuthenticated, function(req, res){
		res.render('pages/account', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', isAuthenticated, function(req, res) {
		req.logout();
		res.redirect('/');
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