const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    if (req.session.userid) {
        res.status(200).render('index')
    } else {
        res.status(200).render('landing')
    }
})

// Google 로그인 라우트
router.get('/auth/login/google', (req, res) => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
  url += `&redirect_uri=${process.env.GOOGLE_LOGIN_REDIRECT_URI}`
  url += '&response_type=code'
  url += '&scope=email profile'
  res.redirect(url);
});
  
router.get('/auth/signup/google', (req, res) => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
  url += `&redirect_uri=${process.env.GOOGLE_SIGNUP_REDIRECT_URI}`
  url += '&response_type=code'
  url += '&scope=email profile'
  res.redirect(url);
});

module.exports = router;