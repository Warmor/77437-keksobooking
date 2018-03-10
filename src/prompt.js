const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (question) => new Promise((resolve) => {
  rl.question(`${question}: `, (ansver) => {
    // rl.pause();
    return resolve(ansver);
  });
});

module.exports = {
  prompt
};
