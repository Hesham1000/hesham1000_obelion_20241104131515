javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Post = require('../models/Post');

Post.init(sequelize);

sequelize.sync();

module.exports = sequelize;
