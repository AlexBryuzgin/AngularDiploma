import sequelize from './../utils/sequelize';
import Sequelize from 'sequelize';

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING(500),
    allowNull: false,
  }
});
export default Comment;