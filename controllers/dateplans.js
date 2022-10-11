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
    req.body.date = new Date (req.body.date+"T09:00:00Z")

    // refactor activities and time into object fitting dateActivitySchema
    // req.body.activities = [{activity: req.body.activityId, time: req.body.activityTime}];
    req.body.activities = [];
    let allActivityIds = [req.body.activityId1, req.body.activityId2, req.body.activityId3, req.body.activityId4, req.body.activityId5, req.body.activityId6];
    let allActivityTimes = [req.body.activityTime1, req.body.activityTime2, req.body.activityTime3, req.body.activityTime4, req.body.activityTime5, req.body.activityTime6];
    let usedActivities = allActivityIds.filter(id => id.length);
    usedActivities.forEach(function(a) {
        let activityObj = {};       
        activityObj.activity = a;
        let idx = allActivityIds.findIndex(el => el===a);
        if (allActivityTimes[idx].length) {
            activityObj.time = allActivityTimes[idx];
        }
        req.body.activities.push(activityObj);
    })

    const datePlan = new DatePlan(req.body);
    datePlan.save(function(err) {
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