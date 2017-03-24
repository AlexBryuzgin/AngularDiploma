import sequelize from './../utils/sequelize';
import Sequelize from 'sequelize';
import Like from './likes';
import Comment from './comments';
import Favorite from './favorites';
import Advert from './adverts';

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
});
User.hasMany(Like, {
  foreignKey: 'user_id',
});
// User.hasMany(Comment);
// User.hasMany(Favorite);
// User.hasMany(Advert);
export default User