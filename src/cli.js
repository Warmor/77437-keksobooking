require(`colors`);
const versionCommand = require(`./commands/version.js`);
const authorCommand = require(`./commands/author.js`);
const descriptionCommand = require(`./commands/description.js`);
const licenseCommand = require(`./commands/license.js`);
const generateCommand = require(`./commands/generate.js`);
const fillCommand = require(`./commands/fill.js`);
const serverCommand = require(`./commands/server.js`);
const prompt = require(`./prompt.js`).prompt;

const welcomeText = `Привет пользователь!\nЭта программа будет запускать сервер «Кексобукинг». Автор: ${authorCommand.value}.\nДля получения списка доступных команд наберите "--help"`;

const getErrorText = (command) => {
  return `"${command}" - Неизвестная команда.`.red;
};

const helpCommand = {
  name: `help`,
  description: `Показать доступные команды`,
  headerText: `Доступные команды:`,
  bodyText: () => {
    return `${[...commandMap].map(([key, value]) => `--${key.toString().grey} - ${value.description.toString().green}`).join(`\n`)}`;
  },
  execute() {
    return new Promise((resolve, reject) => {
      try {
        resolve(console.log(`${this.headerText}\n${this.bodyText()}`));
      } catch (err) {
        reject(err);
      }
    });
  }
};

const commandMap = new Map([
  [helpCommand.name, helpCommand],
  [versionCommand.name, versionCommand],
  [authorCommand.name, authorCommand],
  [descriptionCommand.name, descriptionCommand],
  [licenseCommand.name, licenseCommand],
  [generateCommand.name, generateCommand],
  [fillCommand.name, fillCommand],
  [serverCommand.name, serverCommand],
]);

const executeCommands = (command) => {
  let commandItem = commandMap.get(command.slice(2));
  if (!commandItem) {
    console.log(getErrorText(command));
    commandItem = helpCommand;
  }
  commandItem.execute().then(() => {
    startReadLine();
  });
};

const startReadLine = () => {
  setImmediate(() => {
    prompt(`Введите команду`.green).then((command) => {
      executeCommands(command);
    }).catch((err) => {
      console.error(err);
      startReadLine();
    });
  });
};

module.exports = {
  execute(argv) {
    if (argv.length === 0) {
      console.log(welcomeText);
      startReadLine();
    } else {
      executeCommands(argv[0]);
    }
  }
};
