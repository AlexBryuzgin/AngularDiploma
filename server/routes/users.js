import express from 'express';
import * as user from '../controllers/users';
import roleCheck from '../middleware/roleCheck'

const router = express.Router();

router.post('/sign-in', user.signIn);
router.post('/sign-up', user.signUp);
router.get('/check', roleCheck(['user'], user.fake))
router.get('/admin-page', roleCheck(['admin'], user.dataForAdmin));
router.get('/', user.allUsers);
router.route('/:id')
  .put(roleCheck(['admin'], user.changeData))
  .delete(roleCheck(['admin'], user.deleteUser))
export default router;