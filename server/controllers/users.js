import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/users';

const jwtCreds = {
  secret: 'angulAЯ_dyploma',
  session: false,
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-sign-up', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: jwtCreds.session,
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
        name: 'Wrong email',
        message: 'A user with such email already exists',
      });
    }
    const confirmPassword = req.body.confirmPassword;
    const enteredPassword = password;
    
    if (enteredPassword !== confirmPassword) {
      return done(null, false, {
        sucsess: false,
        name: 'Wrong password confirmation',
        message: 'Your passwords do not match. Please, write the correct passwords',
      });
    }
    User.create({
      email,
      password,
      username: req.body.username,
      role: req.body.role,
    })
      .then(user => done(null, user))
      .catch(err => done(null, false, {message: err}));
  })
  .catch(err => done(null, false, {
        success: false,
        message: err,
  }));
}));

export function signUp(req, res) {
  passport.authenticate('local-sign-up', (err, newUser, info) => {
    if (err) {
      console.log(err);
      return res.status(400).send(info);
    }
    if (!newUser) {
      console.log(info);
      return res.send(info);
    }
    console.log(info);
    res.json(info);
  })(req, res);
}
passport.use('local-sign-in', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: jwtCreds.session,
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
        name: 'Non-existence',
        message: 'A user with such email does not exist',
      });
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, jwtCreds.secret);
    const data = {
      email: user.email,
      username: user.username,
      success: true,
    };
    // пока без солей

    return done(null, token, data);
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
  })
  .catch(err => done(null, false, {
        success: false,
        message: err,
      }
    )
  );
}));

// sign-in middleware
export function signIn(req, res) {
  return passport.authenticate('local-sign-in', (err, token, userData) => {
    if (err) {
      return res.status(400).send('Bad Request');
    }
    return res.json({
      token,
      user: userData,
    });
  })(req, res);
}

export function fake(req, res) {
  res.send('You seem to be an admin');
}

export function roleCheck(roles, func) {
  return function(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Mis1');
    }

    return jwt.verify(token, jwtCreds.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send('Mis2');
      }

      const userId = decoded.id;
      return User.findById(userId)
        .then(user => {
            if(!user) {
              return res.status(401).send('Mis3');
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