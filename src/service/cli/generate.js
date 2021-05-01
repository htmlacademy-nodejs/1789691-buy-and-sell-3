'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  CATEGORIES,
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_OFFER_COUNT,
  SENTENCES,
  TITLES,
  ExitCode,
  OfferType,
  PictureRestrict,
  SumRestrict,
} = require(`../constants`);

const {
  getPictureFileName,
  getRandomInt,
  shuffle
} = require(`../utils`);


const getCategories = () => {
  const categoryCount = getRandomInt(1, CATEGORIES.length - 1);
  const categories = Array(categoryCount).fill({}).map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    category: getCategories(),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }));
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const countOffers = Number(count) || DEFAULT_COUNT;

    if (countOffers > MAX_OFFER_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.FAIL);
    }
    const advertisements = generateOffers(countOffers);

    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(advertisements));
      console.info(chalk.green(`Operation succeded. File has been created and contains ${advertisements.length} items.`));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(chalk.red(`Can't write data to file. Error:`), error);
      process.exit(ExitCode.FAIL);
    }
  },
};
