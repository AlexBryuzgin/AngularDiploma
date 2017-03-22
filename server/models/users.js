import sequelize from './../utils/sequelize';
import Sequelize from 'sequelize';

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
  }
});
export default User