import db from './../utils/db';

export function makeBet(req, res) {
  db.advert.findOne({
    id: req.params.advertId,
    isAuction: true,
  })
    .then((advert) => {
      advert.getBets({ order: 'id DESC' })
      .then((bets) => {
        if(bets[0].user_id === req.userId) return res.status(403).send('Forbidden');
        advert.createBet({
          ...req.body,
          user_id: req.userId,
        })
          .then(bet => res.send(bet));
      })
    })
    .catch(err => res.send({
      success: false,
      ...err,
    }))
}