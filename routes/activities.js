var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const activitiesCtrl = require('../controllers/activities');

// This is for testing. Delete when done
router.get('/index2', function(req, res) {
    res.render('activities/index2');
})

// All routes start with '/activities'
router.get('/', activitiesCtrl.index);
router.get('/new', isLoggedIn, activitiesCtrl.new);
router.post('/', isLoggedIn, activitiesCtrl.create);
router.get('/:id', activitiesCtrl.show);
router.get('/:id/edit', isLoggedIn, activitiesCtrl.edit);
router.put('/:id', isLoggedIn, activitiesCtrl.update);
router.delete('/:id', isLoggedIn, activitiesCtrl.delete);


module.exports = router;
