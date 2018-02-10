require(`colors`);
const config = require(`./_config.js`);
const welcomeText = `Привет пользователь!\nЭта программа будет запускать сервер «Кексобукинг». Автор: ${config.author.value}.\nДля получения списка доступных команд наберите "--help"`;
const getErrorText = (command) => {
  return `"${command}" - Неизвестная команда.`.red;
};
let exitCode = 0;

const setHelpExecute = () => {
  let helpText = [config.help.headerText];
  for (const key of Object.keys(config)) {
    helpText.push(`--${key.toString().grey} - ${config[key].description.toString().green}`);
  }
  config.help.execute = () => {
    console.log(helpText.join(`\n`));
  };
};

setHelpExecute();

let choiceCommand = (commands) => {
  if (commands.length !== 0) {
    commands.forEach((command) => {
      if (typeof config[command.slice(2)] !== `undefined`) {
        config[command.slice(2)].execute();
      } else {
        console.log(getErrorText(command));
        config.help.execute();
        exitCode = 1;
      }
    });
  } else {
    console.log(welcomeText);
  }
};

module.exports = {
  execute(commands) {
    choiceCommand(commands);
    process.exit(exitCode);
  }
};
