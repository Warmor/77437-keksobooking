const versionCommand = require(`./commands/version.js`);
const authorCommand = require(`./commands/author.js`);
const descriptionCommand = require(`./commands/description.js`);
const licenseCommand = require(`./commands/license.js`);

require(`colors`);

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

const commandMap = new Map();
commandMap.set(helpCommand.name, helpCommand);
commandMap.set(versionCommand.name, versionCommand);
commandMap.set(authorCommand.name, authorCommand);
commandMap.set(descriptionCommand.name, descriptionCommand);
commandMap.set(licenseCommand.name, licenseCommand);

const executeCommands = (commands) => {
  if (commands.length === 0) {
    console.log(welcomeText);
    process.exit(0);
  }
  commands.forEach((command) => {
    let commandItem = commandMap.get(command.slice(2));
    if (!commandItem) {
      console.log(getErrorText(command));
      helpCommand.execute();
      process.exit(1);
    }
    commandItem.execute().then(()=>{
      process.exit(0);
    }).catch((err)=> {
      console.error(err);
      process.exit(1);
    });
  });
};


module.exports = {
  execute(commands) {
    executeCommands(commands);
  }
};
