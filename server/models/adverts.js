import sequelize from './../utils/sequelize';
import Sequelize from 'sequelize';
import Like from './likes';
import Comment from './comments';

const Advert = sequelize.define('advert', {
  isAuction: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  currency: {
    type: Sequelize.CHAR,
  },
  likes: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  comments: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  }
});
Advert.hasMany(Like, {
  foreignKey: 'advert_id',
});
// Advert.hasMany(Comment);
export default Advert