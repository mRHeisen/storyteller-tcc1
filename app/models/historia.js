//Importa o mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema(
{
	titulo : {
		type: String,
		require: true
	},
	autor: {
		type: String,
		require: true
	},
	url : {
		type: String,
		require: true
	},
	descricao : {
		type: String,
		require: true
	},
	genero : {
		type: String,
		require: true
	},
	pontuacao : {
		type :  Number,
		require: true
	},
	votos : [
	{
		usuario : String,
		nota : Number
	}
	],
	capitulos : [
    {
        texto : String,
        acao : [
        {
        	numCapitulo : Number,
        	text : String
        }
        ]
    }
    ]
});

mongoose.model('Historia', schema);