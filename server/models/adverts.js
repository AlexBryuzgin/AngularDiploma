export default function(sequelize, Sequelize){
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
      allowNull: false,
    },
    currency: {
      type: Sequelize.CHAR,
    },
    likes_array: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    },
    comments_array: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    }
  }, {
    underscored: true
  });
  return Advert;
}