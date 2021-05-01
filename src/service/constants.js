'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MAX_OFFER_COUNT = 1000;

const ExitCode = {
  SUCCESS: 0,
  FAIL: 1,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_OFFER_COUNT,
  USER_ARGV_INDEX,
  ExitCode,
  OfferType,
  PictureRestrict,
  SumRestrict,
};
