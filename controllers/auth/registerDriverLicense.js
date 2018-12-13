const httpResponse = require('../../utils/http/httpResponse');
const DriverImageModel = require('../../models/driverImage');
const multer = require('multer');

const arrMimeType = ['image/gif', 'image/jpg', 'image/jpeg', 'image/x-png', 'image/png', 'image/svg+xml'];

const fileFilter = (req, file, cb) => {

    console.log('filesssss', req.files);

    if ('fieldname' in file) {

        if (arrMimeType.indexOf(file.mimetype) != -1) {
            cb(null, true);
        } else {
            return cb(res.end('Only images are allowed'), null)
        }
    }else{
        return cb(new Error(httpResponse.getError(7).errors[0].msg))
    }
};
const storage = multer.diskStorage({
   destination: (req, file, res) => {
       console.log('heee')
       //console.log(req.files)
        res(null, './uploads/drivers/');
   },
    filename: (req, file, res) => {
       res(null, Number(new Date) + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    // onError : function(err, next) {
    //     // console.log('error', err);
    //     next(err);
    // },
    limits : {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const insertToDB = async (req, res, next) => {

    console.log('inerrtttttt');
    console.log(req.files);
    try {

        if(!req.files.driverImage || !req.files.driverLicenseImage) {
            res.status(400).send(httpResponse.getError(7));
        }

        varDriveImage = req.files.driverImage[0];
        varDriveLicenseImage = req.files.driverLicenseImage[0];

        let driverImages = new DriverImageModel({
            driverImage: varDriveImage.path,
            driverLicenseImage: varDriveLicenseImage.path
        });

        let error = driverImages.validateSync();

        if (error){
            return res.status(400).send(httpResponse.getError(null, error.message));
        }

        await driverImages.save(function (err) {

            if (err) {

                next(err);
            }
        });

        return res.status(200).send(httpResponse.success({
            driverImage: driverImages.driverImage,
            driverLicenseImage: driverImages.driverLicenseImage

        }));

    }
    catch (e) {
        next(e);
    }
};

module.exports = [
    //upload.fields([{ name: 'driverImage', maxCount: 1 }, { name: 'driverLicenseImage', maxCount: 1 }]),
    insertToDB
];