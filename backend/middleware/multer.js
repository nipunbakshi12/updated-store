import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage
});

export default upload;

// import multer from "multer";
// import path from "path";

// // Configure the storage for the files
// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, 'uploads/'); // Specify the directory where you want to save the files
//     },
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to the filename
//     }
// });

// // Ensure only images are uploaded
// const fileFilter = (req, file, callback) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//         callback(null, true);
//     } else {
//         callback(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed!'), false);
//     }
// };

// // Export the multer instance without .fields()
// const upload = multer({
//     storage,
//     fileFilter
// });

// export default upload;
