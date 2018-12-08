const httpResponse = require('../../utils/http/httpResponse');
const DriverImageModel = require('../../models/driverImage');
const multer = require('multer');

const arrMimeType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/x-png', 'image/png', 'image/svg+xml'];

const fileFilter = (req, file, res) => {
    let mimeType = file.mimetype;

    if (arrMimeType.indexOf(mimeType.toString()) != -1){
        res(null, true);
    }else{
        res(null, false)
    }
};
const storage = multer.diskStorage({
   destination: (req, file, res) => {
        res(null, './uploads/drivers/');
   },
    filename: (req, file, res) => {
       res(null, Number(new Date) + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits : {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const insertToDB = async (req, res, next) => {
    console.log(req.file)
    try {

        if (req.file){
            let driverImage = new DriverImageModel({
                driverImage: req.file.path
            });
        }


        let error = driverImage.validateSync();

        if (error){
            return res.status(400).send(httpResponse.getError(null, error.message));
        }

        await driverImage.save(function (err) {

            if (err) {

                next(err);
            }
        });

        return res.status(200).send(httpResponse.success({
            image: image.driverImage
        }));

    }
    catch (e) {
        next(e);
    }
};

module.exports = [
    upload.single('driverImg'),
    insertToDB
];