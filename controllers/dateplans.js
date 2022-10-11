const DatePlan = require('../models/dateplan');
const Activity = require('../models/activity');
const mongoose = require('mongoose');

module.exports = {
    index,
    new: newDate,
    create,
    show
}

function index(req, res) {
    res.render('dateplans/index', { title: 'Browse Date Plans'});
}

function newDate(req, res) {
    Activity.find({}, function(err, activities) {
        res.render('dateplans/new', { title: 'Create New Date Plan', activities});
    })
}

function create(req, res) {    
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    console.log("this the req.body before changes: ", req.body);
    req.body.date = new Date (req.body.date+"T09:00:00Z")
    // these commented-out sections may be necessary when I implement multiple activities per date plan
    // const dateActivities = ;
    // console.log("this the dateActivities after changes: ", dateActivities);
    req.body.activities = [{activity: req.body.activityId}];
    // req.body.activities.push(dateActivities);
    console.log("this the req.body after changes: ", req.body);
    const datePlan = new DatePlan(req.body);
    datePlan.save(function(err) {
            console.log("Here is the new datePlan", datePlan)
            res.redirect(`/dateplans/${datePlan._id}`);
        });
}

function show(req, res) {
    DatePlan.findById({_id: req.params.id})
    .populate('activities.activity').exec(function(err, datePlan) {
        console.log("this is the datePlan to show: ", datePlan)
        if ((req.user && datePlan.user.equals(req.user._id)) || datePlan.public === true) {
            res.render('dateplans/show', { title: datePlan.title, datePlan})
        } else {
            res.redirect('/')
        }
    })
}