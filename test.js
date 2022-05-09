const fs = require('fs')
// const path = require('path')

// // fs.readdir
// console.log(process.cwd())
// console.log(__dirname)

// fs.mkdir('aliplayer', () => console.log('done'))

//'./src/lib/aliplayercomponents-1.0.8.min.js'

fs.readFile('./src/lib/lib.js', (err, data) => {
  if (err) {
    return console.error(error)
  }
  console.log(data, data.toString())
  // const newContent =
  //   data.toString() + '/n /public/aliplayercomponents-1.0.8.min.js'
  // console.log(newContent)
  // fs.writeFile('result.json', newContent, 'utf8', (err) => {
  //   if (err) throw err
  //   console.log('success done')
  // })
})
