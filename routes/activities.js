var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const activitiesCtrl = require('../controllers/activities');

// All routes start with '/activities/'
router.get('/', activitiesCtrl.index);
router.get('/new', activitiesCtrl.new);

module.exports = router;
