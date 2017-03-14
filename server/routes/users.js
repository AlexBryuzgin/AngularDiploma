import express from 'express';
import * as user from '../controllers/users';
import roleCheck from '../middleware/roleCheck'

const router = express.Router();

router.post('/sign-in', user.signIn);

router.post('/sign-up', user.signUp);
// router.get('/check', user.checkSignIn);
router.get('/check', roleCheck(['user'], user.fake))
// router.get('/', user.getUsers);

export default router;