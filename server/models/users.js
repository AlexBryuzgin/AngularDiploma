import bcrypt from 'bcrypt';
const saltRounds = 10;

export default function(sequelize, Sequelize){
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5, 15],
          msg: 'Ваш никнейм должен быть не короче 5 и не длиннее 15 символов',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Введите email, а не случайную строку'
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          msg: 'Пароль должен быть не короче 8 символов и содержать не менее 1 заглавной, 1 строчной буквы латинского алфавита и 1 цифры',
        },
      },
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    contacts: {
      type: Sequelize.STRING
    }
  }, {
    underscored: true,
    instanceMethods: {
      comparePassword(password, cb){
        return bcrypt.compare(password, this.password)
          .then(match => cb(null, match))
          .catch(err => cb(err))
      }  
    },
  });
  User.beforeCreate(function(user, options, next) {
    bcrypt.genSalt(saltRounds)
      .then((salt) => {
        bcrypt.hash(user.password, salt)
          .then((hash) => {
            user.password = hash;
            next();
          })
          .catch(err => {
            next(err);
          })
      })
      .catch(err => next(err));
  });
  return User;
}
