import db from './../utils/db';

export function getAdvLikes(req, res) {
  db.advert.findOne({
    where: {
      id: req.params.id,
    }
  })
  .then((advert) => {
    advert.getLikes().then(likes => res.send(likes))
  })
  .catch(err => res.send({
    success: false,
    ...err,
  }))
}

export function getCommentLikes(req, res) {
  db.comment.findOne({
    where: {
      id: req.params.commentId,
    }
  })
  .then((comment) => {
    comment.getLikes().then(likes => res.send(likes))
  })
  .catch(err => res.send({
    success: false,
    ...err,
  }))
}

export function addAdvLike(req, res) {
  db.advert.findOne({
    where: {
      id: req.params.id,
    }
  })
  .then((advert) => {
    advert.createLike({
      user_id: req.userId
    })
      .then((like) => {
        console.log(advert);
        advert.update({
          likes_array: advert.dataValues.likes_array.push(like.id),
        });
        advert.getLikes().then(likes => res.send(likes))
      })
  })
  .catch(err => res.send({
    success: false,
    ...err,
  }))
}

export function addCommentLike(req, res) {
  db.comment.findOne({
    where: {
      id: req.params.commentId,
    }
  })
  .then((comment) => {
    comment.createLike({
      user_id: req.userId
    })
      .then(() => {
        comment.getLikes().then(likes => res.send(likes));
      });
  })
  .catch(err => res.send({
    success: false,
    ...err,
  }))
}

export function deleteAdvLike(req, res) {
  db.like.findOne({
    where: {
      advert_id: req.params.id,
      user_id: req.userId
    }
  })
  .then((like) => {
    like.destroy().then(() => getAdvLikes(req, res))
  })
}

export function deleteCommentLike(req, res) {
  db.like.findOne({
    where: {
      comment_id: req.params.commentId,
      user_id: req.userId
    }
  })
  .then((like) => {
    like.destroy().then(() => getCommentLikes(req, res))
  })
}