const express = require('express');
const router = express.Router();

module.exports = function(passport){

    /* GET Home page. */
	router.get('/', function(req, res) {
		res.render('pages/index', { message: req.flash('message') });
    });

	return router;
}
