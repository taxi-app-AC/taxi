const httpResponse = require('../../utils/http/httpResponse');
const multer = require('multer');

const arrMimeType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/x-png', 'image/png', 'image/svg+xml'];

const fileFilter = (req, file, res) => {
    if (arrMimeType.indexOf(file.mimeType) != -1){
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
    }
});
//
// const register = async (req, res, next) => {
//     console.log('hee')/*
//     try {
//
//         // let error = user.validateSync();
//
//
//
//     }
//     catch (e) {
//         next(e);
//     }*/
// };

module.exports = upload.single('driverImg');