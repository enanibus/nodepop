'use strict';

let mongoose = require('mongoose');
let conn = mongoose.connection;
let database = require('../config/local_config').dbURI;

// event connection handlers

conn.on('error', console.log.bind(console, 'connection error!'));

conn.once('open', function () {
    console.log('Connected to MongoDB!');
});

conn.on('disconnected', console.log.bind(console, 'MongoDB disconnected!'));


mongoose.connect(database);

