const fs = require('fs');
const path = require('path');

const publicPath = '../../public/aliplayer'
const filePath = '../../public/aliplayer/aliplayercomponents-1.0.8.min.js'

const fileIsExist = fs.existsSync(filePath)

if (!fileIsExist) {
  fs.mkdir(publicPath, (err) => {
    if (err) {
      return console.error(err);
    }
    fs.copyFile(
      path.join(__dirname, 'aliplayercomponents-1.0.8.min.js'),
      filePath,
      (err) => {
        if (err) throw err;
        console.log('copy done');
      }
    );
  });
}