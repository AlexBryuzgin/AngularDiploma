import db from './../utils/db';

export function createAdvert(req, res) {
  db.user.findOne({
    where: {
      id: req.userId,
    }
  })
    .then((user) => {
      user.createAdvert({
        ...req.body
      })
        .then((advert) => res.send(advert))
    })
    .catch(err => res.send({
      success: false,
      ...err
    }))
};

export function getAdverts(req, res) {
  db.advert.findAll({
    limit: req.query.onpage,
    offset: (req.query.page - 1) * req.query.onpage,
    order: [
      ['id', req.query.order || 'DESC'],
    ],
  })
  .then(adverts => res.send(adverts))
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function getAdvertsByCategory(req, res) {
  db.advert.findAll({
    where: {
      category_id: req.params.categoryId
    },
    limit: req.query.onpage,
    offset: req.query.page - 1,
    order: [
      ['id', req.query.direction || 'DESC'],
    ],
  })
  .then(adverts => res.send(adverts))
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function getAdvertById(req, res) {
  db.advert.findById(req.params.advertId)
  .then((advert) => {
    Promise.all([advert.getComments(), advert.getLikes(), advert])
      .then((result) => {
        const comments = result[0].map(val => val.dataValues);
        const likes = result[1].map(val => val.dataValues);
        const advert = result[2].dataValues;
        console.log(advert);
        return res.send({
          advert,
          comments,
          likes
        })
      });
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function editAdvert(req, res, next) {
  db.advert.findOne({
    where: {
      id: req.params.advertId,
      user_id: req.userId
    }
  })
  .then((advert) => {
    if(!advert) {
      return res.send({
        message: 'No such advert',
        success: false,
      })
    }
    db.advert.update({
      ...req.body
    }, {
      where: {
        id: req.params.advertId
      }
    })
    .then(() => res.send({ success: true }))
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function deleteAdvert(req, res) {
  db.advert.findOne({
    where: {
      id: req.params.advertId,
      user_id: req.userId
    }
  })
  .then((advert) => {
    if (!advert) {
      return res.send({
        success: false,
        message: "У вас нет прав на удаление"
      });
    }
    advert.destroy();
    return res.send({
      success: true,
      message: 'Удалено',
    });
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}