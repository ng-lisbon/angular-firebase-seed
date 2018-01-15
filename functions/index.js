const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const express = require("express");
const oauth = require('oauth');
const cookieSession = require('cookie-session');
const util = require('util');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const twitter = {
  redirect :`https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/api/oauth/twitter/callback`,
  consumerKey:"",
  consumerSecret:""
};

const twitterConsumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  twitter.consumerKey,
  twitter.consumerSecret,
  "1.0A",
  twitter.redirect,
  "HMAC-SHA1"
);



const app = express();


app.use(cookieSession({
  name: 'session',
  keys: ['k1','k2'],
  maxAge: 20000
}));

app.use(cors);




app.get("/oauth/twitter", (request, response) => {
  var userId = request.query.userId;

  if(!userId){
    response.send("Missing userId");
    return;
  }

  request.session.userId = userId;
  twitterConsumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      response.send("Error getting OAuth request token : " + util.inspect(error), 500);
    } else {
      request.session.oauthRequestToken = oauthToken;
      request.session.oauthRequestTokenSecret = oauthTokenSecret;
      response.redirect("https://twitter.com/oauth/authorize?oauth_token="+request.session.oauthRequestToken);
    }
  });
});

app.get("/oauth/twitter/callback", (request, response) => {
  twitterConsumer.getOAuthAccessToken(request.session.oauthRequestToken, request.session.oauthRequestTokenSecret, request.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      response.send("Error getting OAuth access token : " + util.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+util.inspect(results)+"]", 500);
    } else {

      admin.database().ref(`/auth/twitter/${request.session.userId}`).set({oauthAccessToken,oauthAccessTokenSecret});

      response.send("<html><head><script>window.top.close();</script></head></html>");

    }
  });
});


exports.api = functions.https.onRequest(app);
