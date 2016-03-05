var fs = require('fs')

exports.fileExists = function (path) {
  try {
    return fs.statSync(path).isFile()
  }
  catch (e) {
    return false
  }
}

exports.notFileExists = function (path) {
  return !exports.fileExists(path)
}

exports.loadJSON = function (path) {
  try {
    // try to load it
    return JSON.parse(fs.readFileSync(path))
  } catch (err) {
    console.log('Error loading JSON file: ' + err)
    console.error(err)
    process.exit(-1)
  }
}

exports.saveJSON = function (path, data) {
  try {
    // try to load it
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    console.log('Data stored to ' + path)
    console.log(data)
  } catch (err) {
    console.log('Error writing JSON file: ' + err)
    console.error(err)
    process.exit(-1)
  }
}

exports.suddenDeath = function (message) {
  console.log(message)
  process.exit(-1)
}

exports.deathByFieldName = function (fieldname, type) {
  var S = exports.strings
  var msg = S.OBTAIN + '\n' + S.FIELD(fieldname, type) + '\n' + S.README
  exports.suddenDeath(msg)
}

exports.strings = {
  OBTAIN: 'You must obtain a client_id.json file, see README.md',
  README: 'https://github.com/wires/notmuch-gmail-labeler',
  FIELD: function (fieldname, type) {
    var s = 'It must contain a field `' + fieldname + '`'
    if (type) { s += ' of type ' + type }
    return s
  }
}
