

module.exports = {
    index,
    new: newActivity,
}

function index(req, res) {
    res.render('activities/index', { title: "Browse All Activities"});  
}

function newActivity(req, res) {
    res.render('activities/new', { title: "Create a New Activity"});  
}