import express from 'express';
import * as advert from '../controllers/adverts';
import * as comment from '../controllers/comments';
import * as like from '../controllers/likes';
import * as favorite from './../controllers/favorites';
import roleCheck from './../middleware/roleCheck';

const router = express.Router();

// direct work wih advert
router.route('/')
  .get(advert.getAdverts)
  .post(roleCheck(['user', 'admin'], advert.createAdvert));

router.route('/:advertId')
  .get(advert.getAdvertById)
  .put(roleCheck(['user', 'admin'], advert.editAdvert))
  .delete(roleCheck(['user', 'admin'], advert.deleteAdvert));

router.route('/category/:categoryId')
  .get(advert.getAdvertsByCategory);

// work with comments
router.route('/:id/comments')
  .get(comment.getCommentsForAdvert)
  .post(roleCheck(['user', 'admin'], comment.addComment));

router.route('/:id/comments/:commentId')
  .delete(roleCheck(['user', 'admin'], comment.deleteComment));

// work with likes
router.route('/:id/likes')
  .get(like.getAdvLikes)
  .post(roleCheck(['user', 'admin'], like.addAdvLike))
  .delete(roleCheck(['user', 'admin'], like.deleteAdvLike));

router.route('/comments/:commentId/likes')
  .get(like.getCommentLikes)
  .post(roleCheck(['user', 'admin'], like.addCommentLike))
  .delete(roleCheck(['user', 'admin'], like.deleteCommentLike));

// work with favorites
router.route('/:id/favorite')
  .post(roleCheck(['user', 'admin'], favorite.createFavorite))

export default router;

