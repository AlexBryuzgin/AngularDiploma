import express from 'express';
import * as image from './../controllers/image';
import roleCheck from './../middleware/roleCheck';

const router = express.Router();

router.post('/', roleCheck(['user', 'admin'], image.storeImage));


export default router;