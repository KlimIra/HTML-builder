const fs = require('node:fs');
const path = require('node:path');

async function copyDirectory(source, target) {
  await fs.promises.mkdir(target, { recursive: true });

  const files = await fs.promises.readdir(source);
  for (const file of files) {
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

// Example usage
copyDirectory('04-copy-directory/files', '04-copy-directory/files-copy')
  .then(() => console.log('Directory copied successfully'))
  .catch((err) => console.error('Error copying directory:', err));
