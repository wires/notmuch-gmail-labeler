# Notmuch GMail labeler

This program uses the GMail API to label your mail in notmuch.

## Installing

The usual

```sh
git clone git@github.com:wires/notmuch-gmail-labeler
# or: git clone https://github.com:wires/notmuch-gmail-labeler
cd notmuch-gmail-labeler
npm install
```

At this point you are ready to go and authorize yourself; a bit of work,
not too much.

### Allowing access to GMail API

You must obtain an OAuth credentials file first. Visit this wizzard

> https://console.developers.google.com/start/api?id=gmail

Add OAuth credentials for the gmail API. Set the redirect URI to

    http://localhost:63001/oauth2callback

The download the file, it's called `client_id.json`,
move it to this folder.

    client_id.json

If you beautify it, this is more of less what it should look like (don't worry those are not mine :trollface:)

```js
{
  "web": {
    "client_secret": "S6EqUjG6ECpEfg0c4j01PuWs",
    "client_id": "320616623386-xvdu7m?gngrm2bkmodnj2srmtgowy0sn.apps.googleusercontent.com",
    "project_id": "kinked-bananas-123456",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "redirect_uris": ["http://localhost:63001/oauth2callback"]
  }
}
```

### Allowing access to some GMail account

Run the following command:

    » node authorize.js

The output shows an URL

    Authorization process running on http://localhost:63001

Surf to this URL.
