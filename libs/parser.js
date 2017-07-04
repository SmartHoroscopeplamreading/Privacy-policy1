"use strict"
let request = require('request');
let cheerio = require('cheerio');

var Parser = function() {};

Parser.prototype.get = function(sign,day,selector) {
  var url = 'https://horo.mail.ru/prediction/'+ sign +'/'+ day +'/'
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var data = [];
        $(selector).each(function (i,element) {
          data[i] = $(this).text();
        });
        data = data.join(" ");
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = Parser;
