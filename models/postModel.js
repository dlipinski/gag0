/*jshint node: true, esversion: 6, devel: true */
const Auction = require('./user.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
    _id: Number,
    creatorId: { type: Number, ref: 'User' },
    moder: { type: Number, ref: 'User' },
    title: String,
    photoName: String,
    created: { type: Date, default: Date.now }
})