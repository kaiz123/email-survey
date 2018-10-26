const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get(
    '/api/logout',
    (req, res) => {

      req.logout(); //passport exposes a logout() function to req object
      res.redirect('/');
    });

  app.get(
  '/api/current_user',
  (req, res) => {

    res.send(req.user); //passport sets the current user to req object's user property
  });
};