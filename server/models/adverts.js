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
    categoryId: {
      type: Sequelize.INTEGER,
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
    likes_array: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    comments_array: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    }
  }, {
    underscored: true
  });
  return Advert;
}