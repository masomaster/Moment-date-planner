const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    location: String,
    url: String,
    vibe: String,
    category: {
        type: String,
        required: true
    },
    notes: String,
    public: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema);