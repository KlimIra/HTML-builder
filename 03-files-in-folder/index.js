const fs = require('node:fs').promises;
const path = require('node:path');

async function displayFileInfo(directory) {
  const files = await fs.readdir(directory, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const fileStats = await fs.stat(path.join(directory, file.name));
      const fileSize = (fileStats.size / 1024).toFixed(3);
      const fileExtension = path.extname(file.name).split('.').pop();
      console.log(
        `${file.name
          .split('.')
          .slice(0, -1)} - ${fileExtension} - ${fileSize}kb`,
      );
    }
  }
}

// Example usage
displayFileInfo('03-files-in-folder/secret-folder').catch((err) =>
  console.error('Error displaying file info:', err),
);

// const fs = require('node:fs');
// const path = require('node:path');
//
// function displayFilesInfo() {
//   const folderPath = path.posix.join('./secret-folder');
//
//   fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       console.error(err);
//     }
//
//     files.forEach((file) => {
//       const filePath = path.posix.join(folderPath, file);
//
//       fs.stat(filePath, (err, stats) => {
//         if (err) {
//           console.error(err);
//         }
//
//         if (stats.isFile()) {
//           const fileName = path.posix.basename(file, path.posix.extname(file));
//           const fileExtension = path.posix.extname(file).split('.').pop();
//           const fileSize = (stats.size / 1024).toFixed(3);
//
//           console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
//         }
//       });
//     });
//   });
// }
//
// displayFilesInfo();
