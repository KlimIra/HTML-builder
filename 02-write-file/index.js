const fs = require('node:fs');
const readline = require('node:readline');
// const path = require('path').posix;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = './text.txt';

// Проверяем, существует ли файл. Если нет, создаем его.

fs.writeFile(filePath, '', (err) => {
  if (err) {
    console.error('Ошибка при создании файла:', err);
  }
});

// Функция для записи введенного текста в файл
const writeTextToFile = (text) => {
  fs.appendFile(filePath, text + '\n', (err) => {
    if (err) {
      console.error('Ошибка при записи в файл:', err);
    }
  });
};

// Выводим приветствие в консоль
console.log('Привет! Введите текст:');

// Ожидаем ввода от пользователя
rl.on('line', (input) => {
  // Если пользователь ввел "exit", завершаем процесс
  if (input === 'exit') {
    console.log('Прощай!'); // Фраза прощания
    rl.close();
    process.exit(0);
  }

  // Записываем введенный текст в файл
  writeTextToFile(input);

  // Выводим приглашение на ввод текста снова
  console.log('Введите текст:');
});

// Обработчик события при нажатии комбинации ctrl + c
rl.on('SIGINT', () => {
  console.log('Прощай!'); // Фраза прощания
  rl.close();
  process.exit(0);
});
