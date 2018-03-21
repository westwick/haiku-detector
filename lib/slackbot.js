const Slackbots = require('slackbots')
const detectHaiku = require('./haikuDetector')
const _ = require('lodash')

class Slackbot {
  constructor(settings) {
    this.settings = settings
    this.settings.name = this.settings.name || 'HaikuDetector'
  }

  run() {
    this.bot = new Slackbots(this.settings)
    this.bot.on('message', (message) => this.respondToHaikus(message))
  }

  respondToHaikus(message) {
    if (this.isMessageValid(message)) {
      detectHaiku(message.text).then(haiku => {
        this.getUser(message.user).then(user => {
          this.bot.postMessage(message.channel,
            'What a lovely haiku, <@' + user.id + '>!',
            {
              icon_emoji: ':shinto_shrine:',
              username: this.settings.name,
              attachments: [{
                text: haiku.join('\n')
              }]
            })
          })
      }, reject => {
        // no haiku, don't respond
      })
    }
  }

  isMessageValid(message) {
    return message.text && message.type === 'message' && message.subtype !== 'bot_message'
  }

  getUser(id) {
    return this.bot.getUsers().then(users => {
      return _.find(users.members, { id: id })
    })
  }
}

module.exports = Slackbot