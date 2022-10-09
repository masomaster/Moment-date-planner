const Activity = require('../models/activity');

module.exports = {
    index,
    new: newActivity,
    create,
    show,
    edit,
}

function index(req, res) {
    Activity.find({}, function(err, activities) {
        res.render('activities/index', { title: 'Browse All Activities', activities});  
        console.log('These are the activities: ', activities);
    });
}

function show(req, res) {
    Activity.findById({_id: req.params.id}, function(err, activity) {
        res.render('activities/show', { title: activity.title, activity });
    });
}

function newActivity(req, res) {
    res.render('activities/new', { title: 'Create a New Activity'});  
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.title = req.body.title.charAt(0).toUpperCase();
    Activity.create(req.body, function(err, activity) {
    });
    res.redirect('/');
}

function edit(req, res) {
    Activity.findById({_id: req.params.id}, function(err, activity) {
        res.render('activities/edit', { title: `Edit ${activity.title}`, activity });
    });
}