var Bot = require('slackbots');
// create a bot
var settings = {
  token: 'xoxb-131671619526-o8isGcJyEgW4IFv1zol8YTKe',
  name: 'lunch-bot'
};
var bot = new Bot(settings);
var params = {
  as_user : 'true',
};

bot.on('start', function() {
});

function channelIdToName(id) {
    var channels = bot.getChannels();
    if ((typeof channels !== 'undefined')
        && (typeof channels._value !== 'undefined')
        && (typeof channels._value.channels !== 'undefined')) {
        channels = channels._value.channels;
//      console.log(channels);
        for (var i=0; i < channels.length; i++) {
                if (channels[i].id == id) {
                        return channels[i].name;
                }  
        }  
    }  
    return '';
}

function userIdToName(id) {
  var users = bot.getUsers();
  if ((typeof users !== 'undefined')
      && (users._value !== 'undefined')
      && (users._value.members !== 'undefined')) {
      users = users._value.members;
      for (var i=0; i < users.length; i++ ) {
              if (users[i].id == id) {
                      return users[i].name;
              }  
      }  
  }  
  return '';
}

bot.on('start', function() {
});
 
bot.on('message', function(data) {
  if (data.type == 'message') {
    var channelName = channelIdToName(data.channel);
    var userName = userIdToName(data.user);
    var text = data.text;

    console.log(data.ts + ':' + data.channel+ '[' + channelName  + ']:'
                        + data.user + '[' + userName + ']:' + data.text);

    if (text.indexOf('안녕') !== -1) {
      var answer = 'Hello, World.';
      if (channelName != '') {   
        bot.postMessageToChannel(channelName, answer, params);
      }else {
        bot.postMessageToUser(userName, answer, params);
      }
    } else if(text.indexOf('점심') !== -1) {
      var menu = '라면';
      var answer = `오늘 점심은 ${menu}이 어떠세요? ` 
      if (channelName != '') {   
        bot.postMessageToChannel(channelName, answer, params);
      }else {
        bot.postMessageToUser(userName, answer, params);
      }

    }
  }
});