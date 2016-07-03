"use strict";controller.hears("weather in (.*)","direct_mention",function(bot,message){require("isomorphic-fetch");process.env.FORECAST_KEY;var location=message.match[1];var units=function units(param){return"?units="+param};fetch("http://maps.googleapis.com/maps/api/geocode/json?address="+location).then(function(response){return response.json()}).then(function(dataJSON){console.log("Lat:",dataJSON.results[0].geometry.location.lat);console.log("Long:",dataJSON.results[0].geometry.location.lng);var lat=dataJSON.results[0].geometry.location.lat.toString();var lng=dataJSON.results[0].geometry.location.lng.toString();var location=lat+","+lng;return location}).then(function(dataLocation){fetch("https://api.forecast.io/forecast/"+process.env.FORECAST_KEY+"/"+dataLocation+units("si")).then(function(response){return response.json()}).then(function(dataJSON){console.log("weather summary:",dataJSON.currently.summary);console.log("current temperature:",dataJSON.currently.temperature);console.log("current humidity:",dataJSON.currently.humidity);var forecast="The current weather in "+location+" is "+dataJSON.currently.summary+" with a temperature of "+dataJSON.currently.temperature+"C";bot.reply(message,forecast)})}).catch(function(dataLocation){console.log("ERROR!")})});controller.hears(["what can you do"],["mention","direct_message"],function(bot,message){var botCommands={text:"This is what I do so far...",attachments:[{title:"jQuery",text:"Jess-bot can't resist telling you what he thinks about jQuery"},{title:"what day is it?",text:"Clyde will tell you what the day is"},{title:"what is the date",text:"Clyde will tell you waht the date is"},{title:"Open the ---- doors",text:"Clyde may or may not help depending what type of door you ask him to open"},{title:"@clydebot: what is the answer to the ultimate question",text:"You can guess what comes next... \n Use toString() on a previously created varible to return a number (as a string) into the chat"},{title:"While you're typing -- REMOVED",text:"Randomly return a random message while user types"},{title:"user names",text:'tpye "user list" to list all users and bots in js1syd'},{title:"human users",text:'tpye "human users" to list all users in js1syd'},{title:"bot users",text:'tpye "bot users" to list all bots in js1syd'},{title:"user ---",text:'tpye "users" and their user/screen name for basic user information including their online status'},{title:"Random emoji",text:"Display a random emoji character"},{title:"weather in ---",text:"Dispaly the weather for any given (searchable) location"}]};return bot.reply(message,botCommands)});var randomNumber=function randomNumber(param){return Math.floor(Math.random()*param)};controller.hears(["hello"],["mention"],function(whichBot,message){whichBot.reply(message,"That's me!")});controller.hears(["pacman"],["ambient"],function(whichBot,message){whichBot.reply(message,"Run away!!")});controller.hears(["post to clyde"],["direct_message"],function(bot,message){var postMsg={channel:"C1HC4RN1H",text:"blah",attachments:[{title:"post to bot-test-clyde",text:"some text in here.",color:"good",mrkdwn_in:["text","title","pretext","fields","value"]}]};bot.api.chat.postMessage(postMsg)});controller.hears(["open the (.*) doors"],["ambient"],function(bot,message){var doorType=message.match[1];var response=["Do it yourself","Sure, why not","Open sesame..."];if(doorType==="pod bay"){return bot.reply(message,"I'm sorry, Dave. I'm afraid I can't do that.")}else if(doorType==="blue"){return bot.reply(message,{attachments:[{text:"It's bigger on the inside??",image_url:"https://s-media-cache-ak0.pinimg.com/236x/99/b3/53/99b3539ad6802feee85e19bb13af08ae.jpg"}]})}return bot.reply(message,response[randomNumber(response.length)])});controller.hears(["what is the date"],["ambient"],function(bot,message){var today=new Date;var dd=today.getDate();var mm=today.getMonth()+1;var yyyy=today.getFullYear();var showDate=(dd+" / "+mm+" / "+yyyy).toString();bot.reply(message,showDate)});controller.hears(["what day is it"],["ambient"],function(bot,message){var d=new Date;var n=d.getDay();var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];bot.reply(message,days[n-1])});controller.hears(["jquery"],["ambient"],function(bot,message){bot.reply(message,{text:"jQuery is awesome!",username:"jess-bot",icon_url:"https://pbs.twimg.com/profile_images/535601713659400193/bu3qboL9.png"})});controller.hears(["ultimate question"],["direct_mention"],function(bot,message){var meaning=42;var response={text:"I'll take this one @clydebot. The answer to the ultimate question of Life, the Universe and Everything is... "+meaning.toString(),icon_url:"https://donhillson.files.wordpress.com/2012/04/deep_thought.png",username:"deep-thought"};return bot.reply(message,response)});controller.hears(["user list"],["ambient"],function(bot,message){bot.api.users.list({},function(err,response){if(err){bot.botkit.log("something went wrong",err)}var userList=[];var l=response.members.length;bot.botkit.log("number of users:",l);var numberofUsers="number of users"+l.toString();bot.reply(message,numberofUsers);for(var i=0;i<=l;i++){if(i===l){var output=userList.join("\n");bot.reply(message,output)}else{var userName=response.members[i].name;userList.push(userName);bot.botkit.log("user name:",userName)}}})});var p={test:"blah"};function getHumanUsersPresence(id,results){bot.api.users.getPresence({user:id},function(err,response){if(response.presence=="active"){p[id]=response.presence}})}controller.hears("get human users","direct_message",function(bot,message){bot.api.users.list({},function(err,response){if(err){bot.botkit.log("something went wrong",err)}var output=[];for(var i=0;i<response.members.length;i++){if(!response.members[i].is_bot&&response.members[i].name!=="slackbot"){var humanUser=response.members[i].profile.first_name+" "+response.members[i].profile.last_name;var testId=response.members[i].id;getHumanUsersPresence(testId,p);output.push(humanUser)}}})});controller.hears("show online users","direct_message",function(bot,message){var k=Object.keys(p);bot.botkit.log(k)});controller.hears("bot users","ambient",function(bot,message){bot.api.users.list({},function(err,response){if(err){bot.botkit.log("something went wrong",err)}bot.botkit.log("slackbot:   ",response.members[response.members.length-1]);var output=[];for(var i=0;i<response.members.length;i++){if((response.members[i].is_bot||response.members[i].name==="slackbot")&&response.members[i].deleted!==true){var botUser=response.members[i].profile.first_name+" "+response.members[i].profile.last_name;bot.botkit.log("user:   ",i,response.members[i].id);output.push(i+"\t"+botUser)}}bot.reply(message,output.join("\n"))})});controller.hears("who is bot (.*)","ambient",function(bot,message){var botNo=message.match[1];bot.botkit.log(botNo);bot.api.users.list({},function(err,response){if(err){bot.botkit.log("something went wrong",err)}var output="deleted: "+response.members[botNo].name.toString();bot.reply(message,output)})});controller.hears("random emoji","ambient",function(bot,message){bot.api.emoji.list({},function(err,response){if(err){bot.botkit.log("something went wrong",err)}var emojiKeys=Object.keys(response.emoji);var emojiLength=emojiKeys.length;bot.botkit.log("emoji:",response.emoji[emojiKeys[randomNumber(emojiLength)-1]]);var rE=emojiKeys[randomNumber(emojiLength)-1];var randomEmoji=response.emoji[rE];var output={attachments:[{title:"Your random emoji is",text:rE,image_url:randomEmoji}]};bot.reply(message,output)})});var userIDs={};function makeUserList(){bot.api.users.list({},function(err,response){for(var i=0;i<response.members.length;i++){userIDs[response.members[i].name]=response.members[i].id}})}makeUserList();var missingpersons=0;controller.hears("user (.*)",["ambient","direct_message"],function(bot,message){var queryName=message.match[1];var onlineStatus="--";var queryId={users:userIDs[queryName]};var onlineQuery={user:userIDs[queryName]};bot.api.users.getPresence(onlineQuery,function(errOnline,responseOnline){onlineStatus=responseOnline.presence});if(queryId.users!==undefined){missingpersons=0;bot.api.users.list({},function(err,response){if(err){bot.botkit.log("something went wrong",err)}for(var i=0;i<response.members.length;i++){if(response.members[i].id===queryId.users){var userImage={attachments:[{title:"They're real name is `"+response.members[i].real_name+"` \n`"+response.members[i].profile.title+"`",text:response.members[i].profile.first_name+" is currently "+onlineStatus,image_url:response.members[i].profile.image_512}]};bot.reply(message,userImage)}}})}else{if(missingpersons===1){bot.reply(message,"Sorry, no one here by that name");missingpersons=0}else{bot.reply(message,"Huh? I wasn't paying attention, can you repeat that?");makeUserList();missingpersons=1}}});bot.botkit.log("bot started");controller.hears("pizzatime","direct_message",function(bot,message){bot.botkit.log("pizza started");askFlavor=function askFlavor(response,convo){convo.ask("What flavor of pizza do you want?",function(response,convo){if(response.text==="pineapple"){convo.say("No way, that's nasty.");convo.next()}else{convo.say("Nice.");askSize(response,convo);convo.next()}})};askSize=function(_askSize){function askSize(_x,_x2){return _askSize.apply(this,arguments)}askSize.toString=function(){return _askSize.toString()};return askSize}(function(response,convo){convo.ask("Do you want a small, medium or large",function(response,convo){if(response.text==="small"){convo.say(response.text+" it is");askWhereDeliver(response,convo);convo.next()}else if(response.text==="medium"){convo.say(response.text+" good call");askWhereDeliver(response,convo);convo.next()}else if(response.text==="large"){convo.say("bit of an appetite have we?");askWhereDeliver(response,convo);convo.next()}else{convo.say("Can you repeat that?");askSize(response,convo);convo.next()}})});askWhereDeliver=function askWhereDeliver(response,convo){convo.ask("So where do you want it delivered?",function(response,convo){convo.say("Done, pizza on it's way to "+response.text);convo.next()})};bot.startConversation(message,askFlavor)});controller.hears(["keyword","^fish$, ^dragon$"],["direct_message"],function(bot,message){bot.reply(message,"You used a keyword!")});var keyPhrases=["Stark","Lanister","Greyjoy","Bolton"];controller.hears([keyPhrases],["direct_message"],function(bot,message){bot.reply(message,"You used a keyword!")});bot.api.channels.list({},function(err,response){var channelKeys=Object.keys(response)});bot.api.channels.info({channel:"C0ZSX0Z9N"},function(err,response){});bot.api.channels.history({channel:"C0ZSX0Z9N",count:1},function(err,response){});bot.api.im.history({channel:"D1J7GEA6A",count:1},function(err,response){});controller.hears("we need to talk","mention",function(bot,message){bot.api.im.open({user:"U16MQAW1L"},function(err,response){bot.botkit.log("---- chat open");bot.api.chat.postMessage({channel:"U16MQAW1L",text:"Hello",as_user:"U1HDDKWCD"})})});controller.hears("say my name","direct_message",function(bot,message){var messageKeys=Object.keys(message);bot.botkit.log("---- message keys:",messageKeys);messageKeys.forEach(function(key,i){bot.botkit.log("---- key",i,key,message[key])});bot.botkit.log("---- user ",message.user);bot.reply(message,"Your id is: "+message.user.name)});controller.hears(["hello","hi"],"direct_message",function(bot,message){bot.api.reactions.add({timestamp:message.ts,channel:message.channel,name:"robot_face"},function(err,res){if(err){bot.botkit.log("Failed to add emoji reaction :(",err)}});controller.storage.users.get(message.user,function(err,user){if(user&&user.name){bot.reply(message,"Hello "+user.name+"!!")}else{bot.reply(message,"Hello. :squirrel:")}})});controller.hears(["call me (.*)","my name is (.*)"],"direct_message",function(bot,message){var name=message.match[1];controller.storage.users.get(message.user,function(err,user){if(!user){user={id:message.user}}user.name=name;controller.storage.users.save(user,function(err,id){bot.reply(message,"Got it. I will call you "+user.name+" from now on.")})})});controller.hears("create channel called","direct_message",function(bot,message){bot.api.channels.create({name:"newTest"},function(err,response){bot.botkit.log(err)});bot.botkit.log("done")});