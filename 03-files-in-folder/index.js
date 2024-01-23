const fs = require('node:fs').promises;
const path = require('node:path');

async function displayFileInfo(directory) {
  const files = await fs.readdir(directory, { withFileTypes: true });
  for (const file of files) {
    const fileStats = await fs.stat(path.join(directory, file.name));
    const fileSize = (fileStats.size / 1024).toFixed(3);
    const fileExtension = path.extname(file.name);
    if (file.isFile()) {
      if (file.name[0] === '.' && fileExtension.length === 0) {
        if (fileExtension.length > 0) {
          console.log(
            `${file.name.split(fileExtension).slice(0, -1)} - ${fileExtension
              .split('.')
              .pop()} - ${fileSize}kb`,
          );
        }
        console.log(
          `${file.name} - ${fileExtension.split('.').pop()} - ${fileSize}kb`,
        );
      } else {
        console.log(
          `${file.name.split(fileExtension).slice(0, -1)} - ${fileExtension
            .split('.')
            .pop()} - ${fileSize}kb`,
        );
      }
    }
  }
}

// Example usage
displayFileInfo('03-files-in-folder/secret-folder').catch((err) =>
  console.error('Error displaying file info:', err),
);
