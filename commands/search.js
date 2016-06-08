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


const search = (keywords) => {

  //build string
  let query = keywords.join(', ');

  client.get('search/tweets', {q: query}, (err, tw, res) => {
    if (err) throw err;

    let tweets = '';
    for(i=0; i < tw.statuses.length; i++) {
      tweets += `${tw.statuses[i].text} \n` 
    }

    bot.postMessageToChannel(channel, 'Results: ', () => {
      bot.postMessageToChannel(channel, tweets)
    })
  });

}

module.exports = search;
