"use stricts";
var express = require('express');
var db = require("../data/db.js");
var sms = require("../models/sms.js");
var newChat = require("../models/newchat.js");
var async = require('async');
var router = express.Router();
var pg = require('pg');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  var ip = req.connection.remoteAddress;
    var event = req.body.event;
    var selectRegion = function() {
      return " Выберите Ваш знак гороскопа, для этого введите нужную цифру:\n1⃣ Овен .\n2⃣ Телец. \n3⃣ Близнецы. \n4⃣ Рак. \n5⃣ Лев. \n6⃣ Дева. \n7 Весы. \n8 Скорпион. \n9 Стрелец. \n10 Козерог. \n11 Водолей. \n12 Рыбы. \n13 Гороскоп для всех задиаков.";
    }
    var changeRegion = function () {
      return "Введите 'cменить', чтобы сменить знак гороскопа "
    }

    if(event == "user/unfollow") {
    	var userId = req.body.data.id;
    	db.destroy({where:{userId: userId}}).then(function(err) {
        console.log("db destroyed");
      });
    }
    if(event == "user/follow") {
      var userId = req.body.data.id;
      db.create({userId: userId, ip: ip}).then(function(user) {
        console.log("user follows");
        newChat(userId, ip, function(err, res, body) {
          var chatId = body.data.id;
          var message = "Здравствуйте!Я буду присылать Вам самый свежиий гороскоп." + selectRegion();
          sms(message, chatId, ip);
        })
      });
    }
    if(event == "message/new") {
      var userId = req.body.data.sender_id;
      db.find({where: {userId: userId}})
      .then(function(user) {

      	var content = req.body.data.content;
      	var chatId = req.body.data.chat_id;
      	if(req.body.data.type != 'text/plain') {
      		console.log(errMessage);
      		sms(errMessage, chatId, ip);
      		return;
      	}
        if (user.state){
          let correctAnswer = ["1","2","3","4","5","6","7","8","9","10","11","12","13"];
          let errMessage = "Некорректный ввод. " + selectRegion();
          if (correctAnswer.indexOf(content)>= 0) {
            switch(content) {
                case 1:
                    let sign_name = "Овен";
                    let sing_db = 1;
                    break;
                case 2:
                    let sign_name = "Телец";
                    let sing_db = 2;
                    break;
            };
            var message = "Вы выбрали знак "+ sign_name +". Вот гороскоп на сегодня для этого знака";
            db.update({sign: sign_db, state:false}, {where: {userId: userId}}).then(function(user) {
              sms(message, chatId, ip, function() {
                setTimeout(function() {
                  sms('Horoscope today', chatId, ip,function() {
                    setTimeout(function() {
                      sms('All commands', chatId, ip);
                    }, 3000);
                  });
                }, 1000);
              })
            })
          }
          else {
            console.log(errMessage);
        		sms(errMessage, chatId, ip);
          }
        } else {
          var errMessage = "Некорректный ввод. " + changeRegion();
          if(content == "Сменить"){
            db.update({state: true}, {where: {userId: userId}}).then(function(user) {
              sms(selectRegion(), chatId, ip);
            })
          } else {
            console.log(errMessage);
        		sms(errMessage, chatId, ip);
          }
        }
     })
    }
  res.end();
});



module.exports = router;
