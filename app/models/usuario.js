//Importa o mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema(
{
	nome : {
		type: String,
		require: true
	},
	email : {
		type: String,
		require: true
	},
	login : {
		type: String,
		require: true
	},
	senha : {
		type: String,
		require: true
	},
	insignia : [
		{
		type: String
		}
	]
});

mongoose.model('Usuario', schema);