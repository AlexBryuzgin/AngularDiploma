import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import config from './../config/config.json';
import User from '../models/users';

export default function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  });

  passport.use('local-sign-up', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCreds.session,
    passReqToCallback: true,
  }, (req, email, password, done) => {
    User.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      if (user) {
        return done(null, false, {
          success: false,
          message: 'Пользователь с таким email уже существует!',
        });
      }
      const confirmPassword = req.body.confirmPassword;
      const enteredPassword = password;
      
      if (enteredPassword !== confirmPassword) {
        return done(null, false, {
          success: false,
          message: 'Ваши пароли не совпадают. Пожалуйста, введите корректные пароли!',
        });
      }
      User.create({
        email,
        password,
        username: req.body.username,
        role: req.body.role,
      })
        .then(user => done(null, null, {
          message: `Новый пользователь '${user.username}' с ролью '${user.role}' создан`,
          success: true,
        }))
        .catch(err => done(null, false, {
          ...err,
          success: false,
        }));
    })
    .catch(err => done(null, false, {
      success: false,
      ...err,
    }));
  }));

  passport.use('local-sign-in', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCreds.session,
    passReqToCallback: true,
  }, (req, email, password, done) => {
    User.findOne({
      where:{
        email
      }
    })
    .then((user) => {
      if (!user) {
        return done(null, false, {
          success: false,
          message: 'Пользователя с таким email не существует',
        });
      } else {
        const payload = {
          id: user.id,
        };
        const token = jwt.sign(payload, config.jwtCreds.secret);
        const data = {
          email: user.email,
          username: user.username,
        };
        // пока без солей

        return done(null, null, {
          success: true,
          token,
          user: data
        });
        // user.comparePassword(password, (error, match) => {
        //   if (match) {
        //     return done(null, token, data);
        //   } else {
        //     return done(null, false, {
        //       success: false,
        //       message: 'Incorrect password.',
        //     });
        //   }
        // });
      }
    })
    .catch(err => done(null, false, {
          success: false,
          ...err,
        }
      )
    );
  }));
}