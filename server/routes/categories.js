import express from 'express';
import * as category from '../controllers/categories';
import roleCheck from '../middleware/roleCheck'

const router = express.Router();

router.route('/:id')
  .get(category.getAllDirectChildrenCategories);

router.route('/')
  .post(roleCheck(['admin'], category.createCategory))