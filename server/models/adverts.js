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
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
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
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    comments_array: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    likes_array: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    }
  }, {
    underscored: true
  });
  return Advert;
}