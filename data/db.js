var Sequelize = require("sequelize");
var sequelize = new Sequelize("dctd9l0ui6csqk", "crgfkqmptbrbco", "009bdebe6f469d2aa23eeeb04dae7663585714bb0cd0b75d8203828c16e6905f", {
	host: "ec2-23-23-248-162.compute-1.amazonaws.com",
	dialect: "postgres"
});

var user = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: Sequelize.INTEGER,
	ip: Sequelize.STRING,
	state: {
		type: Sequelize.BOOLEAN,
	    defaultValue: true
	},
	sign: {
		type: Sequelize.INTEGER,
	    defaultValue: 13
	},
	subscribed:{
		type:Sequelize.BOOLEAN,
			defaultValue:true
	}
})

user.sync().then(function() {});



module.exports = user;
