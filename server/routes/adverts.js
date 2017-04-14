import express from 'express';
import * as advert from '../controllers/adverts';
import roleCheck from './../middleware/roleCheck';

const router = express.Router();

router.route('/')
  .get(roleCheck(['user', 'admin'], advert.getAdverts))
  .post(roleCheck(['user', 'admin'], advert.createAdvert));

router.route('/:advertId')
  .get(roleCheck(['user', 'admin'], advert.getAdvertById))
  .post(roleCheck(['user', 'admin'], advert.createAdvert))
  .put(roleCheck(['user', 'admin'], advert.editAdvert))
  .delete(roleCheck(['user', 'admin'], advert.deleteAdvert));

router.route('/category/:categoryId')
  .get(roleCheck(['user', 'admin'], advert.getAdvertsByCategory));

export default router;

