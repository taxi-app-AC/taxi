const mongoose = require('mongoose');

let db = process.env.DB;

if(process.env.NODE_ENV === 'test') {
    db = process.env.DB_TEST;
}

mongoose.connect(`mongodb://localhost:27017/${db}`, { useNewUrlParser: true });

