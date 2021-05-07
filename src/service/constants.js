'use strict';

const DEFAULT_COMMAND = `--help`;
const DEFAULT_COUNT = 1;
const DEFAULT_PORT = 3000;
const FILE_NAME = `mocks.json`;
const MAX_OFFER_COUNT = 1000;
const USER_ARGV_INDEX = 2;

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

const ExitCode = {
  SUCCESS: 0,
  FAIL: 1,
};

const HttpCodes = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  FILE_NAME,
  MAX_OFFER_COUNT,
  USER_ARGV_INDEX,
  ExitCode,
  OfferType,
  HttpCodes,
  PictureRestrict,
  SumRestrict,
};
