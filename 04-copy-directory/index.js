const fs = require('node:fs');
const path = require('node:path');

async function copyDirectory(source, target) {
  await fs.promises.mkdir(target, { recursive: true });

  const sourceFiles = await fs.promises.readdir(source);
  const targetFiles = await fs.promises.readdir(target);

  // Удалить файлы, что отсутствуют в files
  for (const file of targetFiles) {
    if (!sourceFiles.includes(file)) {
      const filePath = path.join(target, file);
      await fs.promises.unlink(filePath);
    }
  }

  for (const file of sourceFiles) {
    const current = path.join(source, file);
    const extension = path.join(target, file);
    const stats = await fs.promises.lstat(current);

    if (stats.isDirectory()) {
      await copyDirectory(current, extension);
    } else {
      await fs.promises.copyFile(current, extension);
    }
  }
}

copyDirectory('04-copy-directory/files', '04-copy-directory/files-copy')
  .then(() => console.log('Directory copied successfully'))
  .catch((err) => console.error('Error copying directory:', err));
