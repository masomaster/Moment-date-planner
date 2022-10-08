const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    location: String,
    url: String,
    vibe: [String],
    category: [String],
    notes: [String]
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema);