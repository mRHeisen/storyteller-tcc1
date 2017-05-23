//Importa o mongoose
var mongoose = require('mongoose');
var schema = mongoose.Schema(
{
	nome : {
		type: String,
		require: true
	},
	imagem : {
		type: String,
	},
	descricao : {
		type: String,
		require: true		
	}
});

mongoose.model('Insignia', schema);