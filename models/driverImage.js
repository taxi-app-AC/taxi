const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    driverImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('driverImage', DriverSchema, 'driverImages');