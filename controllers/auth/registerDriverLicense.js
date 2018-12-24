const httpResponse = require('../../utils/http/httpResponse');
const DriverImageModel = require('../../models/driverImage');
const UserModel = require('../../models/user');

const arrMimeType = ['image/gif', 'image/jpg', 'image/jpeg', 'image/x-png', 'image/png', 'image/svg+xml'];

const uploadImage = function (req, res, next) {

    let driverImage = req.files.driverImage;
    let driverLicenseImage = req.files.driverLicenseImage;

    if(Object.keys(req.files).length < 2){
        res.status(401).send(httpResponse.getError(7))
    } else if (arrMimeType.indexOf(driverImage.mimetype) == -1 || arrMimeType.indexOf(driverLicenseImage.mimetype) == -1){
        res.status(401).send(httpResponse.getError(8))
    }else {

        let driverImageName = Number(new Date) + req.files.driverImage.name;
        let driverLicenseImageName = Number(new Date) + req.files.driverLicenseImage.name;

        driverImage.path = __dirname + '/uploads/drivers/' + driverImageName;
        driverLicenseImage.path = __dirname + '/uploads/drivers/' + driverLicenseImageName;

        if(!driverImage || !driverLicenseImage) {
            res.status(401).send(httpResponse.getError(7));
        }
        else {

            driverImage.mv(__dirname + '/../../uploads/drivers/' + driverImageName, function(err) {

                if (err) return res.status(500).send(err);
            });

            driverLicenseImage.mv(__dirname + '/../../uploads/drivers/' + driverLicenseImageName, function(err) {

                if (err) return res.status(500).send(err);
            });

            next();
        }
    }
};

const insertToDB = async (req, res, next) => {

    try {

        if(!req.files.driverImage || !req.files.driverLicenseImage) {
            res.status(400).send(httpResponse.getError(7));
        }else {

            varDriveImage = req.files.driverImage;
            varDriveLicenseImage = req.files.driverLicenseImage;

            let driverImages = new DriverImageModel({
                driverImage: varDriveImage.path,
                driverLicenseImage: varDriveLicenseImage.path
            });

            let UserImages = new UserModel({
                image: {
                    driverImage: varDriveImage.path,
                    driverLicenseImage: varDriveLicenseImage.path
                }
            });

            let error = driverImages.validateSync();

            if (error){
                return res.status(400).send(httpResponse.getError(null, error.message));
            }

            await UserModel.update(
                {_id: '5bf4628b67d9391d244cca6d'},
                { $push: { friends: 'abbas' } },
            );

            // UserModel.find({_id: '5bf4628b67d9391d244cca6d'}, {
            //     image: {
            //         driverImage: varDriveImage.path,
            //         driverLicenseImage: varDriveLicenseImage.path
            //     }
            // }, function(err) {
            //
            //     if (err) {
            //
            //         next(err);
            //     }
            // });

            // await driverImages.save(function (err) {
            //
            //     if (err) {
            //
            //         next(err);
            //     }
            // });

            return res.status(200).send(httpResponse.success({
                driverImage: driverImages.driverImage,
                driverLicenseImage: driverImages.driverLicenseImage

            }));
        }
    }
    catch (e) {
        next(e);
    }
};

module.exports = [
    uploadImage,
    insertToDB
];