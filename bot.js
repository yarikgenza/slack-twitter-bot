const SlackBot = require('slackbots');
const router = require('./router')
const config = require('./config')

//Init
const bot = new SlackBot( {
  token: config.slack.token,
  name: config.slack.botName
})
const channel = config.slack.channel;
const botName = config.slack.botName;


bot.on('start', () => {
    let helloMessage = "Hi, i am twitter-bot"
    bot.postMessageToChannel(channel, helloMessage);
});

bot.on('message', (msg) => {
   if (msg.type == 'message' && msg.username !== botName && msg.text.match(/<@(.+)>/) ) {
        router(msg);
   }
});
