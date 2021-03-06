import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import config from './../config/config.json';
import db from './../utils/db';

export default function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    db.user.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  });

  passport.use('local-sign-up', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCreds.session,
    passReqToCallback: true,
  }, (req, email, password, done) => {
    db.user.findOne({
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
          error: 'Ваши пароли не совпадают. Пожалуйста, введите корректные пароли!',
        });
      }
      db.user.create({
        email,
        password,
        username: req.body.username,
        role: req.body.role,
      })
        .then(user => done(null, null, {
          user: {
            username: user.username,
            role: user.role,
          },
          success: true,
        }))
    })
    .catch(err => done(null, false, {
      success: false,
      error: err,
    }));
  }));

  passport.use('local-sign-in', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCreds.session,
    passReqToCallback: true,
  }, (req, email, password, done) => {
    db.user.findOne({
      where:{
        email
      }
    })
    .then((user) => {
      if (!user) {
        return done(null, false, {
          success: false,
          error: 'Пользователя с таким email не существует',
        });
      }
      user.comparePassword(password, function(error, match) {
        if (match) {
          const payload = {
            id: user.id,
          };
          const token = jwt.sign(payload, config.jwtCreds.secret);
          const data = {
            email: user.email,
            username: user.username,
            role: user.role,
          };
          return done(null, null, {
            success: true,
            token,
            user: data
          });
        }
        return done(null, false, {
          success: false,
          error: 'Пароль не сопадает',
        })
      })
    })
    .catch(err => done(null, false, {
          success: false,
          error: err,
        }
      )
    );
  }));
}