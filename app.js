const { TwitterApi } = require('twitter-api-v2');
var CronJob = require('cron').CronJob;
require("dotenv").config();

const twitBot = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  timeout_ms: 60 * 1000,
});

/// Returns the time to Friday at 18:00
function getTimeToFridayAt18() {
  const today = new Date();
  const friday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 5 - today.getDay(),
    18,
    0,
    0
  );
  const timeToFriday = friday.getTime() - today.getTime();
  return timeToFriday;
}

/// converter milisegundos para dias, horas e minutos
function convertTime(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

async function postTweet() {
  const timeToFriday = convertTime(getTimeToFridayAt18());
  await twitBot.v2.tweet(`Bom dia \nDor e Sofrimento \nFaltam ${timeToFriday.days} dias ${timeToFriday.hours} horas e ${timeToFriday.minutes} minutos para sexta feira às 18 horas`);
  console.log('Tweet posted!');
}

new CronJob('0 8 * * 1-5', postTweet, null, true, 'America/Sao_Paulo');
