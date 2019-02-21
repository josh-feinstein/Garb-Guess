const Sequelize = require('sequelize');
const db = require('../database');

const Clothing = db.define(
  'clothing',
  {
    itemName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    whereWorn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    warmthLevel: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    classynessIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '/images/default.png',
    },
  },
  {
    hooks: {
      beforeValidate: instance => {
        if (instance.itemName === '') {
          throw new Error('The item name field cannot be empty');
        }
        if (instance.whereWorn === '') {
          throw new Error('The where worn field cannot be empty');
        }
        if (instance.warmthLevel === '') {
          throw new Error('The warmth level field cannot be empty');
        }
        if (instance.color === '') {
          instance.color = null;
        }
        if (instance.classynessIndex === '') {
          throw new Error('The classyness index field cannot be empty');
        }
      },
    },
  }
);

module.exports = Clothing;
