"use strict"
var Xray = require('x-ray');
var x = Xray({
    filters: {
      replace: function (value) {
        return typeof value === 'string' ? value.replace(/(?:\r\n|\r|\n|\t|\\)/g, "").trim() : value}}
});

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

  let url = 'https://horoscopes.rambler.ru/'+ (sign == 13 ? "" : sign_name +'/');
  x(url, '._1dQ3',[{
    horo:'span | replace'
  }])
  (function(err,data) {
    callback(data[0].horo)
  })
}
