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
        driverImage: {
            type: String,
        },
        driverLicenseImage: {
            type: String,
        }
    },
    active: Number,
    driver: Number,
    view: Number
});

module.exports = mongoose.model('User', UserSchema, 'user');