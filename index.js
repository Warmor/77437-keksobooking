const VERSION_APP = `v0.0.1`;
const AUTHOR_NAME = `Павел Гришин`;

let getErrorMessage = function (val) {
  return `Неизвестная команда: "${val}".\nЧтобы прочитать правила использования приложения, наберите "--help"`;
};

let messages = {
  '--version': VERSION_APP,
  '--help': `Доступные команды:\n--help    — печатает этот текст;\n--version — печатает версию приложения;`,
  '': `Привет пользователь!\nЭта программа будет запускать сервер «Кексобукинг». Автор: ${AUTHOR_NAME}.`,
};

let getMessage = function (key) {
  return {
    message: messages[key] ? messages[key] : getErrorMessage(key),
    exitMode: messages[key] ? 0 : 1,
  };
};

let showMessage = function (arrParams) {
  let dataMessage = getMessage(arrParams[0] ? arrParams[0] : ``);
  console.log(dataMessage.message);
  process.exit(dataMessage.exitMode);

};

showMessage(process.argv.slice(2));
