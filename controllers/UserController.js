var express = require('express')
var router = express.Router()
const User = require('../models/User');

router.get('/', (req, res) => {

    console.log('test');
    User.find({'name': 'Cavid Mamedov'}, (err, contact) => {
        if(err){
            console.log(err.message);
        }
        res.send(contact);
    })
})

module.exports = router;