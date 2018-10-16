const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); //this should be before requiring passport because passport uses the model User
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app=express();

//the below middleware operation sets the req.session value
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());

//tells passport to use cookies.
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', function (req, res) {
  res.send('hello world')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);