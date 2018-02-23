require(`colors`);
const versionCommand = require(`./commands/version.js`);
const authorCommand = require(`./commands/author.js`);
const descriptionCommand = require(`./commands/description.js`);
const licenseCommand = require(`./commands/license.js`);
const generateCommand = require(`./commands/generate.js`);
const fs = require(`fs`);
const util = require(`util`);
const exists = util.promisify(fs.exists);

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

const commandMap = new Map();
commandMap.set(helpCommand.name, helpCommand);
commandMap.set(versionCommand.name, versionCommand);
commandMap.set(authorCommand.name, authorCommand);
commandMap.set(descriptionCommand.name, descriptionCommand);
commandMap.set(licenseCommand.name, licenseCommand);
commandMap.set(generateCommand.name, generateCommand);

const checkExists = (filePath) => new Promise((resolve) => {
  return exists(`${process.cwd()}/${filePath}`).then((check) => {
    if (check) {
      return prompt(`Файл уже существует, перезаписать? ${`(Y/n)`.green}`).then((res) => {
        if (res.toLowerCase() === `y` || res === ``) {
          return resolve(filePath);
        } else {
          throw new Error(`Выхода нет`.red);
        }
      });
    } else {
      return resolve(filePath);
    }
  });
});

const pipes = [
  async (paramsData) => {
    let quality = await prompt(`Сколько данных хочешь?${`(number)`.green} `);
    if (isNaN(quality)) {
      throw new Error(`Это не число`.red);
    }
    paramsData.quality = quality;
    return paramsData;
  },
  async (paramsData) => {
    let filePath = await prompt(`Куда положить?${`(path or name)`.green} `);
    paramsData.filePath = await checkExists(filePath);
    return paramsData;
  },
];

const getParamsForGenerate = async () => {
  let paramsData = {};
  for (const pipe of pipes) {
    paramsData = await pipe(paramsData);
  }
  return paramsData;
};

const executeCommands = (commands) => {
  if (commands.length === 0) {
    console.log(welcomeText);
    prompt(`Хочешь данных? ${`(Y/n)`.green}`).then(async (res)=>{
      if (res.toLowerCase() === `y` || res === ``) {
        return generateCommand.execute(await getParamsForGenerate());
      }
      return res;
    }).then(()=>{
      process.exit(0);
    }).catch((error) => {
      console.log(error);
      process.exit(1);
    });
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
