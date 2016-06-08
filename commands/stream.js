const Twitter = require('twitter');
const SlackBot = require('slackbots');
const config = require('../config');

const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});
const bot = new SlackBot( {
  token: config.slack.token,
  name: config.slack.botName
})
const channel = config.slack.channel;
const botName = config.slack.botName;


const stream = (keywords, status) => {

  //build string
  let query = keywords.join(', ');


 if( status == true) {


 client.stream('statuses/filter', {track: query}, (stream) => {
  stream.on('data', (tweet) => {
    bot.postMessageToChannel(channel, tweet.text);
  });

  client.currentStream = stream;

  stream.on('error', (error)  => {
    console.log(error);
  });

});

} else {
  client.currentStream.destroy();
}


}

module.exports = stream;
