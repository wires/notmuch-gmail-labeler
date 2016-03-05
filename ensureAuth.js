var open = require('open')
var GoogleAuth = require('google-auth-library')

var apiCredentials = require('./apiCredentials.js')
var callbackServer = require('./callbackServer.js')

// token is tied to scopes, if you change this, you must renew token
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

module.exports = function (callback) {
  // oauth handlers
  var auth = new GoogleAuth()
  var oauth2Client = new auth.OAuth2(
    apiCredentials.clientId,
    apiCredentials.clientSecret,
    apiCredentials.redirectURL
  )

  // we already have a token
  if (apiCredentials.token) {
    oauth2Client.credentials = apiCredentials.token
    return callback(oauth2Client)
  }

  // need new token
  return getNewToken(oauth2Client, callback)
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken (oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })

  // start callback server
  var url = callbackServer({
    redirectURL: authUrl,
    callbackURL: apiCredentials.redirectURL
  }, function (token) {
    oauth2Client.getToken(token, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err)
        return
      }
      oauth2Client.credentials = token
      apiCredentials.storeToken(token)
      callback(oauth2Client)
    })
  })

  open(url)
}
