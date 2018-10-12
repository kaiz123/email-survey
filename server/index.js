const express=require('express');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys= require('./config/keys');

const app=express();
passport.use(new GoogleStrategy({
	clientID : keys.googleClientId,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
}, (accessToken)=>{

	console.log(accessToken);
})
);

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(5000);