'use strict';

const {
  CATEGORIES,
  DEFAULT_COUNT,
  FILE_NAME,
  SENTENCES,
  TITLES,
  OfferType,
  PictureRestrict,
  SumRestrict,
} = require(`../constants`);

const {
  getPictureFileName,
  getRandomInt,
  shuffle
} = require(`../utils`);

const fs = require(`fs`);


const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }));
};

module.exports = {
  name: `--generate`,
  run(count) {
    const countOffers = Number(count) || DEFAULT_COUNT;
    const advertisements = generateOffers(countOffers);
    fs.writeFile(FILE_NAME, JSON.stringify(advertisements), (error) => {
      if (error) {
        console.error(`Can't write data to file. Error:`, error);
        process.exit(1);
      }
      console.info(`Operation succeded. File has been created.`);
      process.exit();
    });
  },
};
