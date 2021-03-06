
General Assembly - JavaScript Sydney
# Hangman SlackBot

A simple game of hangman in SlackBot form. 
SlackBot will choose a word at random from a predefined list displaying a redacted version. As you guess letters the 'puzzleview' will update with the letters you have got right and show a list of the letters that you have not yet giessed. Get a letter wrong and you lose a life. Lose all you lives and it's game over. 

## Commands
- `play hangman` as a direct message (to @clydebot) to start the game.
- `quit` to quit the game.

## Playing the game
- Type any single letter to guess (typing more than letter one will count as guessing the word).
- If the letter is anywhere in the word it will be updated into the puzzle view
- If it is not, you lose a life.
- If you still have lives and have not completed the word you can guess another letter.
- Think you know the answer? Type the whole word (watch out for typos!).
- Guess a wrong word and you will lose a life.

## Winning the game
There are two ways to win:
- Guess all of the letters individually.
- Type in the full word 
- When hte game is finished the bot will post a message into a public channel (#clyde-bot-test here) telling everyone if you won or lost and how long the game lasted.


### Additional
##### Multiple players
Earlier versions had issues with multiple, simultaneous players. Recents updates should resove this by storing game progress in a custom object under their user ID. 

##### Code improvements
- Think this refactored with promises and/or callbacks.
- could be streamlined by making use of callbacks (?).
- Repetition in replies could be streamlined
- inconsistencies with concatenated strings and es6 templates in console.logs
- separate bot replies or introduce a 'thinking' message to reduce gaps between user input and bot response.
- Have not been able to change the user name when posting results to another channel - parked for now



### Tech in use
##### Botkit: 
- Get list of users
- Filter users as human (or bot)
- Filter users by online status (active)
- Get channel information
- Post into other channels
- Listen/respond to user input
- Examine user input to determine user name, post content
- Use mark down to style game responses 
- Use attachments to style text and post images

##### ES6
- Arrow functions: `()=>{}`
- Templates: `${myVar}`
- using `let` to restrict message replies to that function closure

##### JavaScript
- Select random word for game
- Perform different actions based on user input
- Loop over arrays comparing user input to stored values
- Store game information in object key/value pairs
- Update game information in object key/value pairs
- Convert responses/values to uppercase to remove case sensitive issues
- Set interval to use as timer for game: 1/10th second values
- Mathematical operators and conditionals to dispaly time results in seconds or minutes and seconds 
- Chaining api calls 
- Console.log helper fiunctions with different colours coding to aid readability while testing.




----------------------------------
## My First Slackbot - BRIEF

This project serves as a base to start creating a slackbot.

The tools used include:

- node
- npm
- [botkit](https://github.com/howdyai/botkit)
- [now.sh](https://now.sh)

## Setup

**Environment**

For our Slackbot to talk to Slack, it needs a secret token. To ensure the secret
token isn't accidentally shown to the world, we _environment variables_ that are
_never_ commited to git or GitHub. These environment variables are stored in a
file called `.env`.

This project comes with sample environment variables in a file `.env.sample`. To
get started, copy it to `.env`:

```bash
$ cp .env.sample .env
```

Edit the new `.env` file to add your slack token. For example, if your token was
`abc123`, you'd edit the file to be:

```
SLACKBOT_TOKEN=abc123
```

_Remember: The `.env` file should never be added to git, otherwise you will be
giving away your secret key!_

**`now.sh`**

We need to deploy our slackbot somewhere, and the easiest way is with the free
service called [`now`](https://now.sh).

Install `now` onto your machine:

```bash
$ npm install -g now
```

---

## Making your slackbot

### Getting Started

You'll first need to install the packages this project requires to run:

```bash
$ npm install
```

Next, you need to install and save the `botkit` package for this project:

```bash
$ npm install --save botkit
```

You will see `botkit` has been added to your `package.json` file for you:

```json
{
  ...
  "dependencies": {
    "botkit": "^0.2.0",
    ...
  }
  ...
}
```

Now that you have `botkit` installed, we can access it in our JavaScript with
the `require` function:

```javascript
var Botkit = require('botkit');
```

### Connecting to Slack

Slack supports a number of different ways for your bot to connect. The most
basic of which is [Real Time Messaging](http://api.slack.com/rtm) (aka, RTM).

> The Real Time Messaging API is an API that allows you to receive
> events from Slack in real time and send messages as a user. It is the basis for
> all Slack clients. It's also commonly used with the bot user integration to
> create helper bots for your team.
> 
> [Slack] will provide a stream of events, including both messages and updates to
> the current state of the team.
> 
> Almost everything that happens in Slack will result in an event being sent [...]
> The simplest event is a message sent from a user:

Botkit comes with support for RTM ready to go. Here is an example modified
slightly [from
botkit's homepage](https://howdy.ai/botkit/#/get-your-bot-online):

```javascript
var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACKBOT
})
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});
```

Once we've started the connection to the Real Time Messaging API, we can setup
our bot to listen for keywords, commands, etc.

### Listening

Botkit provides a very useful function `.hears()` that allows our bot to
optionally listen for different message types. 3 useful ones are:
  
* `mention`: When someone uses your bot's name anywhere in their message
  * > Jess: Hey everyone, check out @awesomebot my new bot!
* `direct_mention`: When someone starts their message with your bot's name
  * > Jess: @awesomebot how are you doing?
* `direct_message`: When someone sends a private chat message to your bot

You can read about more Slack event types [in the botkit
documentation](https://github.com/howdyai/botkit/blob/master/readme-slack.md#slack-specific-events)

Here is an example of listening for a `mention` message containing the word
`'hello'`:

```javascript
controller.hears(['hello'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Did you say my name?');
});
```

To trigger that response, you could post a message such as:

> Jess: Everyone say hello to @awesomebot!

**`.hears()`**

`.hears()` has 3 parameters;

1. An array of phrases to listen for. These phrases can also be [regular
   expression strings](https://mdn.io/regex)
2. An array of events to listen to. [See the
   docs](https://github.com/howdyai/botkit/blob/master/readme-slack.md#slack-specific-events)
3. A function to execute after a matching event + phrase is received.

### Testing locally

We can test our slackbot locally to make sure it's working. To do so, we use
`npm` to start up our program:

```bash
$ npm start
```

_Note: This runs the command listed in the `package.json` file under
`scripts.start`, which is itself starting up `node` with a couple of extra
options_

Go check out Slack; your bot should now be listening.

To stop it running, type `<Ctrl-C>` on the command line.

### Advanced Usage

Botkit provides lots of great ways to interact with Slack and its users. [Read
the
documentation](https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands)
to find out more.

If you would like to setup an Outgoing web hook, or a slash command, let your
instructor know the URL (see _Deploying_ below) and the parameters you'd like to
setup.

---

## Deploying

When you're done testing locally and are ready to deploy your application, make
sure you're in this project's directory then execute:

```bash
$ now
```

_Note: The first time you do this, it will ask for a valid email address. Enter one,
then go click the link in the email you receive._

`now` will automatically upload and deploy your project for you to the web.

Every time you deploy, `now` will give you a new, unique URL for your project.
This means **you should delete any previous deployments to avoid having multiple
copies running at the same time**:

To delete a deployment, first list out the current IDs:

```bash
$ now list

my-first-slackbot

  VGCt1QVxGMj5i84kfbprKlzH      https://myfirstslackbot-ddwbrdgjjm.now.sh      1h ago
```

Then, to remove the deploy with id `VGCt1QVxGMj5i84kfbprKlzH`, run:

```bash
$ now remove VGCt1QVxGMj5i84kfbprKlzH
```

## All done?

Got a Slackbot up and running, responding to commands? Excellent! Ask your
instructor for more info on the Slackbot assignment which you are now prepared
to get started with.
