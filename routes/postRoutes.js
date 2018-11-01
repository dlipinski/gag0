const express = require('express');
const router = express.Router();

module.exports = function(passport){

    /* GET Create Page */
    router.get('/create', (req, res) => {
		res.render('pages/create');
    });
	router.post('/create', (req, res) => {
		let title = req.body.title;
		let image = req.body.image;
		let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
		if(title.length < 5 || title.length > 80 || !image || image.size>100000 || validImageTypes.indexOf(file.type) === -1) {
			res.render('pages/create', {values: {title, image}});
		} else {

		}
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