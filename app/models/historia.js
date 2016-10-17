//Importa o mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema(
{
	titulo : {
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
	capitulos : [
    {
        numero : Number,
        texto : String,
        proximo : [
        	Number
        ]
    }
    ]
});

mongoose.model('Historia', schema);