const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    driverImage: {
        type: String,
        required: true
    },
    driverLicenseImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('driverImages', DriverSchema, 'driverImages');