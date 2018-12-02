var express = require('express');
var router = express.Router();
var Order = require('../models/Order');

exports.create = function (req, res) {

        // Order.a();


    // let orderObj = {
    //     currently_place:{
    //         lon:req.body.currently_place.lon,
    //         lat:req.body.currently_place.lat
    //     },
    //     where_to:{
    //         lon: req.body.where_to.lon,
    //         lat: req.body.where_to.lat
    //     },
    //     km: req.body.km,
    //     amount: req.body.amount,
    //     transmitter: req.body.transmitter,
    //     phone: req.body.phone,
    //     start_time: req.body.start_time,
    //     end_time: req.body.end_time,
    // };


        // Order.insertOrder(orderObj);



    // post gondermey ucun

    // {
    //     "currently_place": {
    //     "lon":6666,
    //         "lat":55555
    // },
    //     "where_to": {
    //     "lon":6666,
    //         "lat":55555
    // },
    //     "km": 105,
    //     "amount": 20,
    //     "transmitter": 20,
    //     "phone": 20,
    //     "start_time": 20,
    //     "end_time": 154544
    // }

    let orderObj = {
        currently_place:{
            lon:req.body.currently_place.lon,
            lat:req.body.currently_place.lat
        },
        where_to:{
            lon: req.body.where_to.lon,
            lat: req.body.where_to.lat
        },
        km: req.body.km,
        amount: req.body.amount,
        transmitter: req.body.transmitter,
        phone: req.body.phone,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
    };

    Order.create(orderObj,
        function (err, x) {
            if (err) {

                return res.status(500).send("There was a problem create the Order.")
            }

            return res.status(200).send({ Order: x._id});
        });

};