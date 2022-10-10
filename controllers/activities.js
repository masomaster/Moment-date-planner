const Activity = require('../models/activity');

module.exports = {
    index,
    new: newActivity,
    create,
    show,
    edit,
    update,
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
    console.log("this reached the controller!")
    // capitalize and update title, push to req.body
    req.body.title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
    // find activity and ensure user id matches actiivity's user id
    Activity.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id},
        // push req.body material to model
        req.body,
        {new: true},
        function(err, activity) {
            // res.redirect/render to show page
            if (err || !activity) return req.redirect('/activities');
            res.redirect(`/activities/${activity._id}`);
    })
}