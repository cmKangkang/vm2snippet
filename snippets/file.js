const fs = require('fs')
const path = require('path')

function read() {
  console.log('read readme.md')
  const filepath = path.join(__dirname, "readme.md")
  if (!fs.existsSync(filepath)) {
    console.log(`path: ${filepath} not exist`)
    return ""
  }
  const raw = fs.readFileSync(filepath).toString()
  console.log("content:\n", raw)
  return raw
}

module.exports = read()