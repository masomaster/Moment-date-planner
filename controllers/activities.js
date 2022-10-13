const Activity = require('../models/activity');

module.exports = {
    index,
    new: newActivity,
    create,
    show,
    edit,
    update,
    delete: deleteActivity,
}

function index(req, res) {
    Activity.find({}).sort('title').exec(function(err, activities) {
        res.render('activities/index', { title: 'Browse All Activities', activities});  
    });
}

function show(req, res) {
    Activity.findById({_id: req.params.id}, function(err, activity) {
        if ((req.user && activity.user.equals(req.user._id)) || activity.public === true) {
            res.render('activities/show', { title: activity.title, activity });
        } else {
            res.redirect('/')
        }
    })
}

function newActivity(req, res) {
    res.render('activities/new', { title: 'Create a New Activity'});  
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
    Activity.create(req.body, function(err, activity) {
    });
    res.redirect('/');
}

function edit(req, res) {
    Activity.findById({_id: req.params.id}, function(err, activity) {
        res.render('activities/edit', { title: `Edit ${activity.title}`, activity });
    });
}

function update(req, res) {
    req.body.title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
    Activity.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id},
        req.body,
        {new: true},
        function(err, activity) {
            if (err || !activity) return req.redirect('/activities');
            res.redirect(`/activities/${activity._id}`);
    })
}

function deleteActivity(req, res) {
    Activity.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err) {
            res.redirect('/activities');
        }
    )
}