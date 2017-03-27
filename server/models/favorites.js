export default function(sequelize, Sequelize){
  const Favorite = sequelize.define('favorite', {}, {
    underscored: true
  });
  return Favorite;
}