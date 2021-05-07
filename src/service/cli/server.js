'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {DEFAULT_PORT, FILE_NAME, HttpCodes} = require(`../constants`);

const sendRequest = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessage = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const content = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(content);
        const listItems = mocks.map((item) => `<li>${item.title}</li>`).join(``);
        sendRequest(res, HttpCodes.OK, `<ul>${listItems}</ul>`);
      } catch (error) {
        sendRequest(res, HttpCodes.NOT_FOUND, notFoundMessage);
      }
      break;
    default:
      sendRequest(res, HttpCodes.NOT_FOUND, notFoundMessage);
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;
    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (error) => {
        if (error) {
          return console.error(chalk.red(`Creation server error:`), error);
        }

        return console.info(chalk.green(`Wait for connection on ${port} port`));
      });
  },
};
