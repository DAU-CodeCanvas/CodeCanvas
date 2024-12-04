require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const MongoStroe = require('connect-mongo');

const app = express();

const indexRouter = require('./routes/indexRoutes');
const signupRouter = require('./routes/signupRoutes');
const loginRouter = require('./routes/loginRoutes');
const portfolioRouter = require('./routes/portfolioRoutes');
const MongoStore = require('connect-mongo');

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.set('views', './views');

// 미들웨어 설정
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use('/js', express.static(path.join(__dirname, 'views', 'js')));
app.use('/css', express.static(path.join(__dirname, 'views', 'css')));
app.use('/images', express.static(path.join(__dirname, 'views', 'images')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions'
    }),
    cookie: {
        maxAge: (3.6e+6) * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/portfolio', portfolioRouter);
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out.");
    }

    res.clearCookie('connect.sid');

    res.redirect('/');
  })
})

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));