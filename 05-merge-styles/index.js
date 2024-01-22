const fs = require('node:fs');
const path = require('node:path');

const stylesFolder = path.join(__dirname, 'styles');
const outputFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

// Читаем папку стилей
fs.readdir(stylesFolder, (err, files) => {
  if (err) {
    console.error('Error reading styles folder:', err);
    return;
  }

  // Фильтруем только файлы .css
  const cssFiles = files.filter((file) => file.endsWith('.css'));
  let cssContent = '';

  // Создаем массив промисов для чтения каждого CSS-файла
  let fileReadPromises = cssFiles.map((file) => {
    return new Promise((resolve, reject) => {
      const filePath = path.join(stylesFolder, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });

  // Как только все файлы прочитаны, объединяем содержимое и записываем в bundle.css
  Promise.all(fileReadPromises)
    .then((fileContents) => {
      fileContents.forEach((content) => {
        cssContent += content;
      });
      // Записываем объединенное содержимое в bundle.css
      return fs.promises.writeFile(outputFilePath, cssContent, 'utf8');
    })
    .then(() => {
      console.log('bundle.css file has been successfully created');
    })
    .catch((err) => {
      console.error('Error:', err);
    });
});
