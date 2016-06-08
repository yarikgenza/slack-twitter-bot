const Twitter = require('twitter');
const SlackBot = require('slackbots');
const config = require('./config');
const search = require('./commands/search');
const stream = require('./commands/stream');


const bot = new SlackBot( {
  token: config.slack.token,
  name: config.slack.botName
})
const channel = config.slack.channel;
const botName = config.slack.botName;


// helping functions
const unMensh = (string) => { //clear string for <@menshid>:
  let id = /<@(.+)>/;
  if(string.match(id)) {
    let res = string.match(id)[1];
    return string.replace(`<@${res}>`, "").replace(':', "")
  } else {
    return string
  }
}

// Helping variables
let keywords = [];
let currentSteam;



const router = (msg) => {

  let cmd = unMensh(msg.text);


   if( cmd.match(/add/i) ) {

     let word = cmd.replace(/add/i, "").replace(/(^\s+|\s+$)/g,'')
     keywords.push(word);
     let answer = `Keyword added. \n There are this keywords: ${keywords.join(', ')}`
     bot.postMessageToChannel(channel, answer)

   }

   else if ( cmd.match(/delete/i) ) {
     let word = cmd.replace(/delete/i, "").replace(/(^\s+|\s+$)/g,'')
     keywords.splice(keywords.indexOf(word), 1);

     let answer;

     if (keywords.length == 0) {
        answer = 'Deleted. \n There are no keywords. \n Use add/delete [keyword] commands';
     } else {
        answer = `Keyword deleted. \n There are this keywords: ${keywords.join(', ')}`;
     }

     bot.postMessageToChannel(channel, answer)
   }

   else if ( cmd.match(/show/i) )  {

     if(keywords.length == 0) {
       bot.postMessageToChannel(channel, 'There are no keywords. \n Use add/delete [keyword] commands');
     } else {
       let answer = `There are this keywords: ${keywords.join(', ')}`
       bot.postMessageToChannel(channel, answer);
     }

   }

   else if ( cmd.match(/find/i) ) {
     search(keywords);
   }

   else if ( cmd.match(/stream/i) ) {
     currentStream = true;
     stream(keywords, currentStream);
   }

   else if ( cmd.match(/stop/i) ) {
     currentStream = false;
     stream(keywords, currentStream);
   }

}



module.exports = router;
