const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
//require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app=express();
// passport.use(new GoogleStrategy({
// 	clientID : keys.googleClientID,
// 	clientSecret: keys.googleClientSecret,
// 	callbackURL: '/auth/google/callback'
// }, (accessToken,refreshToken,profile,done)=>{

// 	console.log(accessToken);
// 	console.log(profile);
// })
// );


// app.get('/auth/google', passport.authenticate('google',{
// 	scope: ['profile','email']
// }));


// app.get('/auth/google/callback', passport.authenticate('google'));


app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', function (req, res) {
  res.send('hello world')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);