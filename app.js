const twit = require('twit');
require("dotenv").config();

const flutterBot = new twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
  timeout_ms: 60 * 1000,
});

const getTimeToFridayAt18 = () => {
  const today = new Date();
  const friday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5 - today.getDay());
  const diff = friday - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
};

// flutterBot.post('statuses/update', { status: `Bom dia \nDor e Sofrimento \nFaltam ${timeToFriday.days} dias ${timeToFriday.hours} horas e ${timeToFriday.minutes} para sexta feira às 18hrs` }, (err, data, response) => {
//   console.log(data);
// }, (err, data, response) => {
//   console.log('successfull');
// }
// );

setInterval(() => {
  const timeToFriday = getTimeToFridayAt18();
  flutterBot.post('statuses/update', { status: `Bom dia \nDor e Sofrimento \nFaltam ${timeToFriday.days} dias ${timeToFriday.hours} horas e ${timeToFriday.minutes} para sexta feira às 18hrs` }, (err, data, response) => {
    console.log(data);
  }, (err, data, response) => {
    console.log('successfull');
  }
  );
}, 1000 * 60 * 60 * 8);



