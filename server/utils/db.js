import Sequelize from 'sequelize';
import users from './../models/users';
import adverts from './../models/adverts';
import likes from './../models/likes';
import comments from './../models/comments';
import favorites from './../models/favorites';
import bets from './../models/bets';
import categories from './../models/categories';

const db = {};
const sequelize = new Sequelize('postgres://Aliaksandr_Bruzgin:alex@localhost:5432/diploma_db');

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = users(sequelize, Sequelize);
db.advert = adverts(sequelize, Sequelize);
db.like = likes(sequelize, Sequelize);
db.comment = comments(sequelize, Sequelize);
db.favorite = favorites(sequelize, Sequelize);
db.bet = bets(sequelize, Sequelize);
db.category = categories(sequelize, Sequelize);

// user -> advert
db.user.hasMany(db.advert, {
  foreignKey: 'user_id',
  constraints: false,
});
db.advert.belongsTo(db.user, {
  foreignKey: 'user_id',
});

// user -> like
db.user.hasMany(db.like, {
  foreignKey: 'user_id',
});
db.like.belongsTo(db.user, {
  foreignKey: 'user_id',
});

// user -> comment
db.user.hasMany(db.comment, {
  foreignKey: 'user_id',
});
db.comment.belongsTo(db.user, {
  foreignKey: 'user_id',
});

// user -> favorite
db.user.hasMany(db.favorite, {
  foreignKey: 'user_id',
});
db.favorite.belongsTo(db.user, {
  foreignKey: 'user_id',
});

// user -> bet
db.user.hasMany(db.bet, {
  foreignKey: 'user_id',
});
db.bet.belongsTo(db.user, {
  foreignKey: 'user_id',
});

// advert -> like
db.advert.hasMany(db.like, {
  foreignKey: 'advert_id',
});
db.like.belongsTo(db.advert, {
  foreignKey: 'advert_id',
});

// advert -> comment
db.advert.hasMany(db.comment, {
  foreignKey: 'advert_id',
});
db.comment.belongsTo(db.advert, {
  foreignKey: 'advert_id',
});

// advert -> bet
db.advert.hasMany(db.bet, {
  foreignKey: 'advert_id',
});
db.bet.belongsTo(db.advert, {
  foreignKey: 'advert_id',
});

// advert -> favorite
db.advert.hasMany(db.favorite, {
  foreignKey: 'advert_id',
});
db.favorite.belongsTo(db.advert, {
  foreignKey: 'advert_id',
});

// advert <-> category
db.category.hasOne(db.advert, {
  foreignKey: 'category_id',
})
db.advert.belongsTo(db.category, {
  foreignKey: 'category_id',
});

export default db;

