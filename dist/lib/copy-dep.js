const fs = require('fs');
const path = require('path');

console.log('run copy')
console.log(process.cwd())
// path.join(__dirname, '../../public/scripts/aliplayercomponents-1.0.8.min.js'),
//   '../../aliplayercomponents-1.0.8.min.js',
// fs.mkdir('aliplayer', () => console.log('done'))

const publicPath = '../../public/aliplayercomponents-1.0.8.min.js'
const gitignorePath = '../../.gitignore'

const fileIsExist = fs.existsSync(publicPath)
const gitignorePathIsExist = fs.existsSync(gitignorePath)

if (!fileIsExist) {
  fs.copyFile(
    path.join(__dirname, 'aliplayercomponents-1.0.8.min.js'),
    publicPath,
    (err) => {
      if (err) throw err;
      console.log('copo done');
    }
  );

  if (gitignorePathIsExist) {
    fs.readFile(gitignorePath, 'utf-8', (err, data) => {
      if (err) {
        return console.error(error)
      }
      console.log(data, data.toString())
      const newContent = data + '/n /public/aliplayercomponents-1.0.8.min.js'
      fs.writeFile('result.json', newContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('success done');
    });
    })
  }
} else {
  fs.rm(publicPath, { force: true }, (err)=> {
    console.log(err)
  })
}

// if (fileIsExist) {
//   fs.rm(publicPath, (err)=> {
//     console.log(err)
//   })
// } else {
//   fs.copyFile(
//     path.join(__dirname, 'aliplayercomponents-1.0.8.min.js'),
//     publicPath,
//     (err) => {
//       if (err) throw err;
//       console.log('copo done');
//     }
//   );
// }

