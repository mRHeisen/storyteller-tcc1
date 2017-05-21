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
	disponivel : {
		type: Boolean,
		require: true
	},
	capitulos : [
    {
    	tipo : String,
        texto : String,
        acao : [
        {
        	numCapitulo : Number,
        	text : String,
        	valor : Number
        }
        ]
    }
    ]
});

mongoose.model('Historia', schema);