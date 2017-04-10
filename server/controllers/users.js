import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import db from '../utils/db';
import passportConfig from './../config/strategies';

passportConfig(passport);

export function signUp(req, res) {
  passport.authenticate('local-sign-up', (err, newUser, info) => {
    if (err) {
      return res.status(400).send({
        message: err,
        success: false,
      });
    }
    if (!newUser) {
      return res.send({
        success: false,
        ...info,
      });
    }
    res.send(info);
  })(req, res);
}

// sign-in middleware
export function signIn(req, res) {
  return passport.authenticate('local-sign-in', (err, user, info) => {
    if (err) {
      return res.status(400).send('Bad Request');
    }
    return res.json(info);
  })(req, res);
}

export function fake(req, res) {
  res.send('You seem to be an admin');
}

export function dataForAdmin(req, res) {
  db.user.findAll()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.send(err);
  });
}

export function allUsers(req, res) {
  db.user.findAll()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.send(err);
  })
}

export function getUserData(req, res) {
  db.user.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.send(err))
} 

export function changeData(req, res) {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    if(!user){
      res.send({
        message: 'No such user',
        success: false,
      })
    }
    db.user.update({
      ...req.body,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      db.user.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(newUser => res.send(newUser))
      .catch(err => res.send(err))
    })
    .catch(err => res.send(error))
  })
  .catch(err => res.send(err))
}

export function deleteUser(req, res) {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    if(!user) {
      res.send({
        message: 'No such user',
        success: false
      })
    }
    const username = user.username;
    db.user.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.send({
        message: `User '${username}' has been successfully deleted`,
        success: true,
      });
    })
    .catch(err => res.send(err))
  })
  .catch(err => res.send(err))
}
