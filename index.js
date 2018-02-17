const commandManager = require(`./src/cli.js`);

commandManager.execute(process.argv.slice(2));
