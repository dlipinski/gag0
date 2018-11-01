//jshint browser: true, esversion: 6, node: true
const Post = require('../models/postModel.js');

// Display list of all Auction.
exports.post_list = (req, res) => {
	let pageNumber = 0;
	if (req.params.pageNumber) {
		pageNumber = req.params.pageNumber;
	}
    Post.find({
		accepted: true
	})
	.skip(pageNumber * 20)
	.limit(20)
    .exec(function (err, posts_list) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { posts: posts_list,message: req.flash('message')});
	});
};