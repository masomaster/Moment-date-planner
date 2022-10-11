const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateActivitySchema = new Schema ({
    time: String,
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }
}, {
    timestamps: true
  })

const dateSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    date: Date,
    location: String,
    people: String,
    activities: [dateActivitySchema],
    notes: String,
    public: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('DatePlan', dateSchema)