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

app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);



if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);});