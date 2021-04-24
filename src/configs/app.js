const express = require('express');
// const bodyParser = require('body-parser'); ---Depricated
const cors = require('cors');
const path = require('path');

// API Routes
const userRoutes = require('../routes/user');

const app = express();

// APP Middlewares :-

// Setting Req Body Parsers
// app.use(bodyParser.json()); ---Depricated
app.use(express.json());
// app.use(bodyParser.urlencoded( {extended: true} )); ---Depricated
app.use(express.urlencoded());

// Setting Req Origin, Headers, Methods
const corsOptions = {
    // In production change 'localhost' to registered domain name
    origin: '*',
    allowedHeaders: ['Origin', 'x-Requested-With', 'Content-Type', 'Accept', 'x-access-token'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}
app.use(cors(corsOptions));

// API Endpoints (Passing API Routes as APP Middlewares)
app.use('/api/user', userRoutes);

module.exports = app;