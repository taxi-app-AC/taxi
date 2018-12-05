const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        'allowedExts': ['gif', 'jpeg', 'jpg', 'png', 'svg', 'blob'],
        'allowedMimeTypes': ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml']
    },
    active: Number
});

module.exports = mongoose.model('User', UserSchema, 'user');