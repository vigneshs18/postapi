const bcryptjs = require('bcryptjs');
const { request } = require('express');

const { User } = require('../models/user');

const salt_count = process.env.BCRYPTJS_SALT_COUNT || '';
// console.log(`Bcryptjs Salt Count : ${salt_count}`);

exports.createUser = async(req, res) => {
    try {
        // for Controller Level Unique Validation Check (will also be caught by 'Model Level Unique Validation Check')
        let user = await User.findOne( { email: req.body.email } );
        if(user) return res.status(400).send({
            status: 'Fail',
            message: 'Email Already Exists',
            data: null
        });

        const salt = await bcryptjs.genSalt(parseInt(salt_count));
        // console.log(salt);
        // console.log(req.body);
        // console.log(req.body.name);
        // console.log(req.body.email);
        // console.log(req.body.password);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcryptjs.hash(req.body.password, salt) 
        });

        await user.save();

        res.status(201).send({ 
            status: 'Pass',
            message: 'User Created',
            data : null
        });
    } catch(err) {
        res.status(500).send({ 
            status: 'Fail',
            message: err.message,
            data : null
        });
    }
}

exports.loginUser = async(req, res) => {
    try {
        const user = await User.findOne( {email: req.body.email} );
        if(!user) return res.status(400).send({
            status: 'Fail',
            message: 'Invalid Email',
            data: null
        });

        const password = await bcryptjs.compare(req.body.password, user.password);
        if(!password) return res.status(400).send({
            status: 'Fail',
            message: 'Invalid Password',
            data: null
        });

        const token = user.generateAccessToken();
        // to genearte a unix timestamp after 12hrs on server side
        const expiresInMS = (+ new Date()) + 43200000;

        res.status(200).send({
            status: 'Pass',
            message: 'User LoggedIn',
            data : { token: token, email: user.email, name: user.name, expiresInMS: expiresInMS }
        });
    } catch(err) {
        res.status(500).send({ 
            status: 'Fail',
            message: err.message,
            data : null
        });
    }
}
