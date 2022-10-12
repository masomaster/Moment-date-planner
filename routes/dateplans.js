var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const datePlansCtrl = require('../controllers/dateplans');

// All routes prepended with "/dateplans"
router.get('/', datePlansCtrl.index);
router.get('/new', isLoggedIn, datePlansCtrl.new);
router.post('/', isLoggedIn, datePlansCtrl.create);
router.get('/:id', datePlansCtrl.show);
router.delete('/:id', isLoggedIn, datePlansCtrl.delete)
router.get('/:id/edit', isLoggedIn, datePlansCtrl.edit)


module.exports = router;
