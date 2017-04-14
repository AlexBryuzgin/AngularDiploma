import db from './../utils/db';

export function createAdvert(req, res, userId) {
  db.advert.create({
    ...req.body,
    user_id: userId,
  })
  .then(() => res.send('Вы успешно создали объявление'))
  .catch(err => res.send({
    success: false,
    ...err
  }))
};

export function getAdverts(req, res) {
  db.advert.findAll()
  .then(adverts => res.send(adverts))
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function getUsersAdverts(req, res, userId) {
  db.advert.findAll({
     where: {
       user_id: userId
     }
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
      categoryId: req.params.categoryId
    }
  })
  .then(adverts => res.send(adverts))
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function getAdvertById(req, res) {
  db.advert.findById(req.params.advertId)
  .then(advert => res.send(advert))
  .catch(err => res.send({
    success: false,
    ...err
  }))
}

export function editAdvert(req, res, userId) {
  db.advert.findOne({
    where: {
      id: req.params.advertId,
      user_id: userId
    }
  })
  .then((advert) => {
    if(!advert){
      res.send({
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

export function deleteAdvert(req, res, userId) {
  db.advert.findOne({
    where: {
      id: req.params.advertId,
      user_id: userId
    }
  })
  .then((advert) => {
    db.advert.destroy({
      where: {
        id: req.params.advertId,
        user_id: userId
      }
    })
    .then(() => res.send({
      success: true,
    }))
    .catch(err => res.send({
      success: false,
      ...err
    }));
  })
  .catch(err => res.send({
    success: false,
    ...err
  }))
}