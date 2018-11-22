var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderShema = new Schema({
   currently_place:{
       lon:{
           type: String,
           required:true,
       },
       lat:{
           type: String,
           required:true,
       }
   },
    where_to:{
       lon:{
           type: String,
           required: true
       },
        lat:{
            type: String,
            required: true
        }
    },
    km:{
        type: Number,
        required: true
    },
    amount:{
        type: String,
    },
    transmitter:{
       type: Number,
        required: true
    },
    phone:{
       type: String,
        required: true
    },
    start_time:{
       type: Number,
    },
    end_time:{
       type: Number
    }
});
exports.a = function () {
    // res.status(200).send({ Order: 'success' });
    console.log('ahhhhhhh');
};

exports.insertOrder = function (req, res){
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

    this.create(orderObj,
        function (err) {
            if (err) {

                return res.status(500).send("There was a problem create the Order.")
            }

            return res.status(200).send({ Order: 'success' });
        });
};

module.exports = mongoose.model('Order', OrderShema, 'order');