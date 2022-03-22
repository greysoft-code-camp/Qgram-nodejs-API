import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp'); // create folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, res, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(err, false);
  }
};

export default multer({ storage: storage }, { fileFilter: fileFilter }).single(
  'image'
);
