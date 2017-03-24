import sequelize from './../utils/sequelize';
import User from './users';
import Advert from './adverts';

const Like = sequelize.define('like', {});
// Like.belongsTo(User);
// Like.belongsTo(Advert)
export default Like;