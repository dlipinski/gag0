//jshint browser: true, esversion: 6, node: true
const Post = require('../models/post.js');

// Display list of all Auction.
exports.post_list = (req, res) => {
    Post.find()
    .exec(function (err, posts_list) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { posts: posts_list,message: req.flash('message')});
	});
};