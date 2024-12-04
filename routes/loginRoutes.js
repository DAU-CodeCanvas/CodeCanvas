const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
const { json } = require('body-parser');

const mongoose = require('mongoose');
const User = require('../models/User');

const session = require('express-session');

router.get('/', async(req, res) => {
    if (req.session.userid) {
        res.status(200).redirect('/')
    } else {
        res.status(200).render('login')
    }
})

router.get('/redirect', async(req, res) => {
    const { code } = req.query;

    const response1 = await axios.post(process.env.GOOGLE_TOKEN_URL, qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_LOGIN_REDIRECT_URI,
        grant_type: 'authorization_code',
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const response2 = await axios.get(process.env.GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${response1.data.access_token}`
        },
        params: {
            alt: "json"
        }
    });

    userInfo = response2.data;
    const existingUser = await User.findOne({email: userInfo.email});

    if(existingUser) {
        req.session.userid = existingUser.userid
        req.session.email = existingUser.email
        req.session.save((err) => {
            if (err) {
                return res.status(500).send('Failed to create session');
            }

            res.status(201).redirect('/');
        });
    } else {
        res.status(202).redirect('/login');
    }
});

module.exports = router;