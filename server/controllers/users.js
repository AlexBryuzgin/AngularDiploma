import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import db from '../utils/db';
import passportConfig from './../config/strategies';
import jwt from 'jsonwebtoken';
import config from './../config/config.json';

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
  console.log(req.body);
  return passport.authenticate('local-sign-in', (err, user, info) => {
    if (err) {
      return res.status(400).send('Bad Request');
    }
    return res.json(info);
  })(req, res);
}

export function getUsersAdverts(req, res, userId) {
  db.advert.findAll({
    where: {
      user_id: req.userId,
    }
  })
    .then(adverts => res.send(adverts))
    .catch(err => res.send({
      success: false,
      ...err
    }))
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
    res.send({
      success: false,
      ...err
    });
  });
}

export function allUsers(req, res) {
  db.user.findAll()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.send({
      success: false,
      ...err
    });
  })
}

export function getUserData(req, res) {
  db.user.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.send({
      success: false,
      ...err
    }))
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
      .catch(err => res.send({
        success: false,
        ...err
      }))
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

export function checkLogin(req, res) {
  const token = req.headers.authorization;
  return jwt.verify(token, config.jwtCreds.secret, (err, decoded) => {
    if (err) {
      return res.send(err);
    }
    const userId = decoded.id;
    return db.user.findById(userId)
      .then((user) => {
        if (!user) return res.status(401).send('Unauthorized');
        return res.send({
          success: true,
          token,
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
          },
        })
      })
      .catch(() => res.status(401).send('Unauthorized'));
  });
}
