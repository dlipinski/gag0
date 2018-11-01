/*jshint node: true, esversion: 6, devel: true */
const Auction = require('./userModel.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
    _id: Number,
    creatorId: { type: Number, ref: 'User' },
    moder: { type: Number, ref: 'User' },
    title: String,
    photoName: String,
    accepted: Boolean,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);