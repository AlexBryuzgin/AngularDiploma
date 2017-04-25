import db from '../utils/db';

export function createFavorite(req, res) {
  db.advert.findById(req.params.id)
    .then((advert) => {
      advert.createFavorite({
        user_id: req.userId,
      }).then(favorite => res.send(favorite))
    })
    .catch(err => res.send({
      success: false,
      ...err
    }))
}

export function getUsersFavorites(req, res) {
  db.user.findById(req.userId)
    .then((user) => {
      if(!user) return res.send({ success: false })
      user.getFavorites().then((favs) => res.send(favs))
    })
    .catch(err => res.send({
      success: false,
      ...err
    }))
}

export function undoFavorite(req, res) {
  db.favorite.findOne({
    where: {
      id: req.params.id,
      user_id: req.userId
    }
  })
  .then(fav => {
    if(!fav) return res.send({ success: false });
    fav.destroy()
      .then(() => res.send('HUI'));
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}