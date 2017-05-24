import express from 'express';
import multer from 'multer';
import * as image from './../controllers/image';
import roleCheck from './../middleware/roleCheck';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `.${file.mimetype.substr(6)}`) //Appending .jpg
  }
})

const upload = multer({ storage });

router.post('/', upload.array('file'), image.storeImage);


export default router;