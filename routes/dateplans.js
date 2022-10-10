var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const datePlansCtrl = require('../controllers/dateplans');

router.get('/new', datePlansCtrl.new);
router.post('/', isLoggedIn, datePlansCtrl.create);


module.exports = router;
