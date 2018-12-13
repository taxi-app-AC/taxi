const multipartMiddleware = require('connect-multiparty')();
const Login = require('../controllers/auth/login');
const Register = require('../controllers/auth/register');
const Me = require('../controllers/auth/me');
const Upload = require('../controllers/auth/registerDriverLicense');
const { validationResult } = require('../middlewares/controller');
const requestValidator = require('../middlewares/requestValidators/auth');
const multer = require('multer');

var express = require('express');
var router = express.Router();

router.post('/login',
    requestValidator.login,
    validationResult,
    Login
);

router.post('/register',
    requestValidator.register,
    validationResult,
    Register
);

const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/upload',
    function (req, res, next) {
    console.log(Object.keys(req.files).length);
        //console.log(req.files);
        let sampleFile = req.files.driverImage;
        let sampleFile2 = req.files.driverLicenseImage;
        if(!sampleFile || !sampleFile2) {
            console.log('he9hefochcoiwec')
            res.status(401).send('dsds');
        }
        else {
            sampleFile.mv(__dirname+'/../uploads/drivers/filename.jpg', function(err) {
                if (err)
                    return res.status(500).send(err);

                //res.send('File uploaded!');
            });

            sampleFile2.mv(__dirname+'/../uploads/drivers/filename2.jpg', function(err) {
                if (err)
                    return res.status(500).send(err);

                //res.send('File2 uploaded!');
            });
        }

        // Use the mv() method to place the file somewhere on your server

    },
    Upload
);

router.get('/me',
    Me
);

module.exports = router;