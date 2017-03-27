export default function(sequelize, Sequelize){
  const Bet = sequelize.define('bet', {
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    currency: {
      type: Sequelize.CHAR,
    },
  }, {
    underscored: true
  });
  return Bet;
}