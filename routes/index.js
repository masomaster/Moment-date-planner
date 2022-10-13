var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const Activity = require('../models/activity');
const DatePlan = require('../models/dateplan');

router.get('/', function(req, res, next) {
  Activity.find({}).sort('-updatedAt').limit(6).exec(function(err, activities) {
    DatePlan.find({}).sort('-updatedAt').limit(6).exec(function(err, dateplans) {
      console.log(activities, dateplans);
      res.render('index', { title: "Create Magical Moments", activities, dateplans});  
    })
  });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // prompt: "select_account"
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) {return next (err);}
    res.redirect('/');
  });
});

module.exports = router;
