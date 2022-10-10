const DatePlan = require('../models/dateplan');

module.exports = {
    new: newDate,
    create,
}

function newDate(req, res) {
    res.render('dateplans/new', { title: 'Create New Date Plan'});
}

function create(req, res) {    
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    DatePlan.create(req.body, function(err, datePlan) {
        console.log("here is the new date plan", datePlan)
    });    
    res.redirect('/');
}