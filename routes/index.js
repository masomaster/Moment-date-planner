var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const Activity = require('../models/activity');

router.get('/', function(req, res, next) {
  Activity.find({}, function(err, activities) {
    res.render('index', { title: "Overview", activities});  
  });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: "select_account"
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
