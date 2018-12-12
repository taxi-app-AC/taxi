const app = require('express')();
const expressValidator = require('express-validator');
const arrMimeType = ['image/gif', 'image/jpg', 'image/jpeg', 'image/x-png', 'image/png', 'image/svg+xml'];

// app.use(expressValidator({
//     customValidators: {
//         isImage: function(value, filename) {
//
//             var extension = (path.extname(filename)).toLowerCase();
//             if (arrMimeType.indexOf(file.mimetype) != -1){
//                 return true;
//             } else {
//                 return false;
//             }
//         }
// }}));