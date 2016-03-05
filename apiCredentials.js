var fs = require('fs')

var API_CREDENTIALS_PATH = 'client_id.json'

// check if we have OAuth credentials file
if (!fs.statSync(API_CREDENTIALS_PATH).isFile()) {
  console.log('You must obtain a client_id.json file, see README.md')
  console.log('https://github.com/wires/notmuch-gmail-labeler')
  process.exit(-1)
}

// try to load it
var content = null
try {
  content = JSON.parse(fs.readFileSync(API_CREDENTIALS_PATH))
} catch (err) {
  console.log('Error loading client secret file: ' + err)
  console.error(err)
  process.exit(-1)
}

module.exports = content
