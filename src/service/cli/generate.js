'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_OFFER_COUNT,
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

const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter((item) => item.length);
  } catch (error) {
    console.error(chalk.red(`Cannot read file ${filePath}`), error);
    return [];
  }
};

const getCategories = (categories) => {
  const categoryCount = getRandomInt(1, categories.length - 1);
  return shuffle(categories).slice(0, categoryCount);
};

const generateOffers = (categories, sentences, titles, count) => {
  return Array(count).fill({}).map(() => ({
    category: getCategories(categories),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
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

    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const advertisements = generateOffers(categories, sentences, titles, countOffers);

    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(advertisements));
      console.info(chalk.green(`Operation succeded. File has been created and contains ${advertisements.length} items.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file. Error:`), error);
      process.exit(ExitCode.FAIL);
    }
  },
};
