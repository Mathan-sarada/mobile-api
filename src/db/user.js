const mongoose = require('mongoose');
let schema = new mongoose.Schema({
    mobile_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    otp: { type: String, required: true },
    message_sid: { type: String },
    isActive: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let user = mongoose.model('users', schema);
user.createIndexes();
exports.user = user
