import express from 'express';
import * as user from '../controllers/users';
import * as favorite from '../controllers/favorites';
import roleCheck from '../middleware/roleCheck'

const router = express.Router();

router.post('/sign-in', user.signIn);
router.post('/sign-up', user.signUp);
router.get('/check', roleCheck(['user'], user.fake));
router.get('/adverts', roleCheck(['user', 'admin'], user.getUsersAdverts));
router.get('/admin-page', roleCheck(['admin'], user.dataForAdmin));
router.get('/', user.allUsers);
router.route('/admin-page/:id')
  .get(roleCheck(['admin'], user.getUserData))
  .put(roleCheck(['admin'], user.changeData))
  .delete(roleCheck(['admin'], user.deleteUser));

router.route('/favorites')
  .get(roleCheck(['user', 'admin'], favorite.getUsersFavorites));

router.route('/favorites/:id')
  .delete(roleCheck(['user', 'admin'], favorite.undoFavorite));

export default router;