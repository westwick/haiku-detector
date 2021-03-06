const nlp = require('nlp_compromise')
const syllablesAsync = require('nlp-syllables-async')
const _ = require('lodash')
nlp.plugin(syllablesAsync)

function detectHaiku(input, debug=false) {
  return new Promise((resolve, reject) => {
    const wordsArray = input.trim().split(' ')
    if (wordsArray.length < 3 || wordsArray.length > 17) {
      reject()
      return
    }
    let promises = [];

    wordsArray.forEach((word) => {
      promises.push(nlp.text(word).termsWithSyllables())
    })

    Promise.all(promises).then((words) => {
      const syllables = words.map(w => w[0].syllables)
      if (debug) {
        console.log(syllables)
      }
      const total_syllables = _.sumBy(syllables, 'length')

      if (total_syllables !== 17) {
        reject()
        return
      }

      let haiku = [[''], [''], ['']]
      let i = 0
      let paragraph = 0
      let isHaiku = true
      words.forEach(word => {
        if (i > 0) {
          haiku[paragraph] += ' '
        }
        haiku[paragraph] += word[0].normal
        i += word[0].syllables.length

        if (paragraph === 0) {
          if (i === 5) {
            paragraph = 1
            i = 0
          }
          if (i > 5) {
            isHaiku = false
          }
        }

        if (paragraph === 1) {
          if (i === 7) {
            paragraph = 2
            i = 0
          }
          if (i > 7) {
            isHaiku = false
          }
        }
      })

      if (!isHaiku) {
        reject()
      } else {
        resolve(haiku)
      }
    })
  })
}

module.exports = detectHaiku