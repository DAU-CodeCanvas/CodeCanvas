const express = require('express');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async(req, res) => {
    if (!req.session.userid) {
        res.status(200).redirect('/')
    } else {
        const user = await User.findOne({email: req.session.email});
        const portfolio = await Portfolio.find({authorId: user._id})
        res.status(200).render('portfolioMain', { portList: portfolio })
    }
})

router.get('/writter', async(req, res) => {
    if (!req.session.userid) {
        res.status(200).redirect('/')
    } else {
        res.status(200).render('portfolioWritter')
    }
})

router.post('/writter', async(req, res) => {
    const title = req.body.title;
    const tags = req.body.tags;
    const htmlContent = req.body.contents;
    let hashtags;
    if (tags.length == 0) {
        hashtags = [];
    } else {
        hashtags = JSON.parse(tags).map((e) => {
            return e.value;
        });
    }
    const type = 'project';
    const email = req.session.email;
    const user = await User.findOne({email: email});
    const authorId = user._id;
    const visibility = "public";

    const newPortfolio = new Portfolio({
        title,
        htmlContent,
        type,
        tags: hashtags,
        authorId,
        visibility
    });

    await newPortfolio.save();

    res.status(200).redirect('/');
});

router.get('/article', async(req, res) => {
    const portfolio = await Portfolio.findById(req.query.id);
    res.status(200).render('portfolioArticle', {portfolio});
})

module.exports = router;