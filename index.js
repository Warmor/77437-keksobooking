switch (process.argv[2]) {
  case undefined:
    console.log(`
Привет пользователь! 
Эта программа будет запускать сервер «Кексобукинг». Автор: Гришин Павел.    
    `);
    process.exit(0);
    break;
  case `--version`:
    console.log(`v0.0.1`);
    process.exit(0);
    break;
  case `--help`:
    console.log(`
Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;
    `);
    process.exit(0);
    break;
  default:
    console.log(`
Неизвестная команда ${process.argv[2]}.
Чтобы прочитать правила использования приложения, наберите "--help"    
    `);
    process.exit(1);
    break;
}

