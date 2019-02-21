

const db = require('./database');
const Sequelize = require('sequelize');
const Clothing = require('./models/clothing');
// const Campuses = require('./models/campuses');

// Campuses.hasMany(Students);
// Students.belongsTo(Campuses);

module.exports = {
  db,
  Clothing,
};
