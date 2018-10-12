const express=require('express');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys= require('./config/keys');

const app=express();
passport.use(new GoogleStrategy({
	clientID : keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
}, (accessToken,refreshToken,profile,done)=>{

	console.log(accessToken);
})
);


app.get('/auth/google', passport.authenticate('google',{
	scope: ['profile','email']
}));


app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/', function (req, res) {
  res.send('hello world')
});

app.listen(5000);