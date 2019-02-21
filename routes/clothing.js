const router = require('express').Router();
const Clothing = require('../db/models/clothing');

router.get('/', async (req, res, next) => {
  try {
    const allClothing = await Clothing.findAll({
      order: [['itemName', 'ASC']],
    });
    res.status(200).json(allClothing);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleItem = await Clothing.find({
      where: { id: req.params.id },
    });
    res.status(200).json(singleItem);
  } catch (err) {
    next(err);
  }
});

router.get('/:color', async (req, res, next) => {
  try {
    const allClothingOfColor = await Clothing.find({
      where: { color: req.params.color },
    });
    res.status(200).json(allClothingOfColor);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newItem = await Clothing.create(req.body);
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:itemID', async (req, res, next) => {
  try {
    const deletedItem = await Clothing.destroy({
      where: { id: req.params.itemID },
    });
    res.json(deletedItem);
  } catch (err) {
    next(err);
  }
});

router.put('/:itemID', async (req, res, next) => {
  try {
    const updatedItem = await Clothing.update(req.body, {
      where: { id: req.params.itemID },
    });
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json([
//     {
//       id: 1,
//       username: 'samsepi0l',
//     },
//     {
//       id: 2,
//       username: 'D0loresH4ze',
//     },
//   ]);
// });

// module.exports = router;
