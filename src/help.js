require(`colors`);
module.exports = {
  name: `help`,
  description: `Показать доступные команды`,
  headerText: `Доступные команды:`,
  execute() {
    console.error(`This method should be redefined`.red);
    process.exit(1);
  }
};
