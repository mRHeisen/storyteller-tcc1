//Importa o mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema(
{
	titulo : {
		type: String,
		require: true
	},
	genero : {
		type: String,
		require: true
	},
	pontuacao : {
		type : Number,
		require: false
	},
	capitulos: [
	{
		numero: Number,
		texto: String,
	}
	]
});

mongoose.model('Historia', schema);