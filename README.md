# haiku-detector
A Slack bot that scans your messages for hidden Haikus and reposts them in Haiku format

# Running the bot

## Run on Heroku
The quickest way to get started, deploy to Heroku for free:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/westwick/haiku-detector)

## Run locally
To run the bot you can either `npm start` or `node bin/run.js`. You will need to pass in an `API_TOKEN` environment variable: 

```$ API_TOKEN=example_slack_token npm start```

## Debugging
To check if a string is a haiku without using the slack bot, you can run the following in the terminal, which will also print out the syllables: `$ node lib/cli.js "string you want to check"`