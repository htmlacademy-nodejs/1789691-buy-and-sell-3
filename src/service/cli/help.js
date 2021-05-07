'use strict';

const chalk = require(`chalk`);

const HELP = `
Доступные команды:
--help              выводит справку
--generate <count>  генерирует тестовые данные в mocks.json файл
--version           выводит версию программы
--server <port>     запускает сервер на указанном порту. По умолчанию 3000.
`;

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.blue(HELP));
  },
};
