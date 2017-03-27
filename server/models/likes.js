export default function(sequelize, Sequelize){
  const Like = sequelize.define('like', {}, {
    underscored: true
  });
  return Like;
}