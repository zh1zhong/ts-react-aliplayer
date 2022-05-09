const fs = require('fs');

const publicPath = '../../public/aliplayercomponents-1.0.8.min.js'


fs.rm(publicPath, { force: true }, (err)=> {
  console.log(err)
})
