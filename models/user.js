/*jshint node: true, esversion: 6, devel: true */
const Auction = require('../models/post.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const UserSchema = mongoose.Schema({
    _id: Number,
    username: String,
    password: String,
    email: String,
    posts: [{type: Number, ref: 'Post'}]
});