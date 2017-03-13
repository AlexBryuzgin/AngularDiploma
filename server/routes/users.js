import express from 'express';
import * as user from '../controllers/users';

const router = express.Router();

router.post('/sign-in', user.signIn);

router.post('/sign-up', user.signUp);
// router.get('/check', user.checkSignIn);
router.get('/check', user.roleCheck(['user'], user.fake))
// router.get('/', user.getUsers);

export default router;