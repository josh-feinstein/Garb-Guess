const { db } = require('./db');
const Clothing = require('./db/models/clothing');

const clothing = [
  {
    itemName: 'Hat',
    whereWorn: 'Head',
    warmthLevel: 2,
    classynessIndex: 10,
    color: 'red',
    imageUrl: '/images/hat.jpg',
  },
  {
    itemName: 'Winter Coat',
    whereWorn: 'Top',
    warmthLevel: 10,
    classynessIndex: 8,
    color: 'black',
  },
  {
    itemName: 'Jeans',
    whereWorn: 'Bottom',
    warmthLevel: 6,
    classynessIndex: 6,
    color: 'blue',
  },
  {
    itemName: 'Sneakers',
    whereWorn: 'Feet',
    warmthLevel: 4,
    classynessIndex: 4,
    color: 'white',
  },
];

const seed = () =>
  Promise.all(clothing.map(clothing => Clothing.create(clothing))).catch(
    err => {
      console.log('Danger Will Robinson, danger! Error while seeding');
      console.log(err.stack);
    }
  );

const main = () => {
  console.log('Database sync, initiated.');
  db.sync({ force: true })
    .then(() => {
      console.log('Database seeding complete.');
      return seed();
    })
    .catch(err => {
      console.log('Danger Will Robinson, danger! Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
