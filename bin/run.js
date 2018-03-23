const Slackbot = require('../lib/slackbot')

if(process.env.API_TOKEN == null) {
  throw new Error('API_KEY not set')
}

const bot = new Slackbot({
  token: process.env.API_TOKEN.trim(),
  name: process.env.BOT_NAME
})

bot.run()