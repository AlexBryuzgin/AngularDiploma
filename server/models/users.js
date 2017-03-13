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
        msg: 'Your username should be not less than 5 symbols and not more than 15',
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
        msg: 'Must set an email, not a random string'
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        msg: 'Password should consist of Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number',
      },
    },
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
export default User