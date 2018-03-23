#!/usr/bin/env node
const detectHaiku = require('./haikuDetector')

const input = process.argv[2]
detectHaiku(input, true).then(haiku => {
  console.log(haiku)
}, error => {
  console.log('not a haiku')
})