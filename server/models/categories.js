export default function(sequelize, Sequelize){
  const Category = sequelize.define('category', {
    parent_category_id: {
      type: Sequelize.INTEGER,
    },
    children_ids: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    underscored: true
  });
  return Category;
}