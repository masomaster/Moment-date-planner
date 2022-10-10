const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    date: Date,
    location: String,
    people: String,
    activities: [{
        time: String,
        activity: Schema.Types.ObjectId
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('DatePlan', dateSchema)