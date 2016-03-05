var utils = require('./utils')

var API_CREDENTIALS_PATH = 'client_id.json'
var TOKEN_PATH = 'token.json'

// check if we have OAuth credentials file
if (utils.notFileExists(API_CREDENTIALS_PATH)) {
  console.log('You must obtain a client_id.json file, see README.md')
  console.log('https://github.com/wires/notmuch-gmail-labeler')
  process.exit(-1)
}

// try to load it
var credentials = utils.loadJSON(API_CREDENTIALS_PATH)

// the toplevel key can change, I've seen `installed` and `web` so far.
// so we pick the first automagically
var keys = Object.keys(credentials)
var base = credentials[keys[0]]

if (utils.fileExists(TOKEN_PATH)) {
  base.token = utils.loadJSON(TOKEN_PATH)
}

// take the first redirect_uri or die, common courtesy
base.clientSecret = base.client_secret || utils.deathByFieldName('client_secret')
base.clientId = base.client_id || utils.deathByFieldName('client_id')

// here we pull out the first of the urls
var us = base.redirect_uris
base.redirectURL = (us && us[0]) || utils.deathByFieldName('redirect_uris', 'Array')

// allow to update apiConfiguration
base.storeToken = function (token) {
  utils.saveJSON(TOKEN_PATH, token)
  base.token = token
}

module.exports = base
