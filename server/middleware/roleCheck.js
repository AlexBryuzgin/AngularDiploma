import jwt from 'jsonwebtoken';
import User from '../models/users';
import config from './../config/config.json';

export default function roleCheck(roles, func) {
  return function(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    return jwt.verify(token, config.jwtCreds.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send('Unauthorized');
      }

      const userId = decoded.id;
      return User.findById(userId)
        .then(user => {
            if(!user) {
              return res.status(401).send('Unauthorized');
            }
            if(!roles.includes(user.role)) {
              res.send('You have no access')
            } else {
              func(req, res, next);
            }
            return next();
          }
        )
        .catch(err => console.log(err));
    });
  }
}