export default function(sequelize, Sequelize){
  const Comment = sequelize.define('comment', {
    text: {
      type: Sequelize.STRING(500),
      allowNull: false,
    }
  }, {
    underscored: true
  });
  return Comment;
}