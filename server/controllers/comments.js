import db from './../utils/db';

export function getCommentsForAdvert(req, res) {
  db.advert.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((advert) => {
    advert.getComments()
      .then(comments => res.send(comments))
      .catch(err => res.send({
        success: false,
        ...err
      }))
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function addComment(req, res) {
  db.advert.findOne({
    where: {
      id: req.params.id,
    }
  })
  .then((advert) => {
    advert.createComment({
      user_id: req.userId,
      text: req.body.text,
    })
    // .then(comment => res.send(comment))
    .then((comment) => {
      advert.update({
        comments: advert.comments.push(comment.id)
      });
      advert.getComments()
        .then(comments => res.send(comments))
    })
    .catch(err => res.send({
      success: false,
      ...err
    }))
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function deleteComment(req, res, next) {
  db.comment.findOne({
    where: {
      user_id: req.userId,
      id: req.params.commentId,
    }
  })
  .then((comment) => {
    if(!comment) return next();
    comment.destroy();
    return res.send('Комментарий удалён');
  })
}