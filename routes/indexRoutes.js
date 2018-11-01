const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');


module.exports = function(passport){

	/* GET home page, optional some page */
	router.get('/', post_controller.post_list)	
	router.get('/page/', post_controller.post_list);
	return router;
}
