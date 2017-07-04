"use strict"
let request = require('request');
let cheerio = require('cheerio');

exports.getHoroscope = function(sign,day,callback) {
  let sign_name;
  switch(sign) {
  case 1: sign_name = "aries"; break;
  case 2: sign_name = "taurus"; break;
  case 3: sign_name = "gemini"; break;
  case 4: sign_name = "cancer"; break;
  case 5: sign_name = "leo"; break;
  case 6: sign_name = "virgo"; break;
  case 7: sign_name = "libra"; break;
  case 8: sign_name = "scorpio"; break;
  case 9: sign_name = "sagittarius"; break;
  case 10: sign_name = "capricorn"; break;
  case 11: sign_name = "aquarius"; break;
  case 12: sign_name = "pisces"; break;}

  let url = 'https://horo.mail.ru/prediction/'+ sign_name +'/'+ day +'/';

	request(url,function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var $ = cheerio.load(body);
      var data = [];
      $('.article__text p').each(function (i,element) {
        data[i] = $(this).text();
      });
      data = data.join(" ");
      callback(data);
    } else {
      console.log(err);
    }

	})
}
