const DatePlan = require('../models/dateplan');
const Activity = require('../models/activity');

module.exports = {
    index,
    new: newDate,
    create,
    show,
    delete: deleteDatePlan,
    edit,
    update
}

function index(req, res) {
    DatePlan.find({}).populate('activities.activity').sort('title').exec(function(err, dateplans) {
        res.render('dateplans/index', { title: 'Browse Date Plans', dateplans});
    })
}

function newDate(req, res) {
    Activity.find({}).sort('title').exec(function(err, activities) {
        res.render('dateplans/new', { title: 'Create New Date Plan', activities});
    })
}

function create(req, res) {    
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.date = new Date (req.body.date+"T09:00:00Z")
    req.body = reshapeActivitiesForSchema(req.body)
    const datePlan = new DatePlan(req.body);
    datePlan.save(function(err) {
        res.redirect(`/dateplans/${datePlan._id}`);
    });
}

function show(req, res) {
    DatePlan.findById({_id: req.params.id})
    .populate('activities.activity').exec(function(err, datePlan) {
        if ((datePlan.user.equals(req.user?._id)) || datePlan?.public === true) {
            res.render('dateplans/show', { title: datePlan.title, datePlan})
        } else {
            res.redirect('/')
        }
    })
}

function deleteDatePlan(req, res) {
    DatePlan.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/dateplans')
    })
}

function edit(req, res) {
    DatePlan.findById({_id: req.params.id})
    .populate('activities.activity').exec(function(err, datePlan) {
        if ((datePlan.user.equals(req.user?._id)) || datePlan.public === true) {
            Activity.find({}).sort('title').exec(function(err, activities) {
                res.render('dateplans/edit', { title: datePlan.title, datePlan, activities})
            })
        } else {
            res.redirect('/')
        }
    })
}

function update(req, res) {
    req.body = reshapeActivitiesForSchema(req.body)
    DatePlan.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id},
        req.body,
        {new: true},
        function(err, datePlan) {
            if (err || !datePlan) return res.redirect('/dateplans');
            res.redirect(`/dateplans/${datePlan._id}`);
        }
    )
}

// Re-shape activities and time arguments into objects fitting dateActivitySchema
function reshapeActivitiesForSchema(reqBody) {
    reqBody.activities = [];
    let allActivityIds = [reqBody.activityId1, reqBody.activityId2, reqBody.activityId3, reqBody.activityId4, reqBody.activityId5, reqBody.activityId6];
    let allActivityTimes = [reqBody.activityTime1, reqBody.activityTime2, reqBody.activityTime3, reqBody.activityTime4, reqBody.activityTime5, reqBody.activityTime6];
    let usedActivities = allActivityIds.filter(id => id.length);
    usedActivities.forEach(function(a) {
        let activityObj = {};       
        activityObj.activity = a;
        let idx = allActivityIds.findIndex(el => el===a);
        if (allActivityTimes[idx].length) {
            activityObj.time = allActivityTimes[idx];
        }
        reqBody.activities.push(activityObj);
    })
    return reqBody;
}