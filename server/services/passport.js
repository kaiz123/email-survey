const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//serializeUser determines which data of the user object should be stored in the session,
//it is called during login, it sets the cookie in the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//it is called during all subsequent requests(subsequent requests menans requests after login) 
//it takes cookie property(id in this case) and finds respective user.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      //proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
      .then(existingUser =>  {
        console.log("hellohellohello")
        if (existingUser) {
          done(null,existingUser);
        }
        else{

          new User({googleId:profile.id})
          .save()
          .then(user => done(null,user));
        }

    });
    }
  )
);