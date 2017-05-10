var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.set('secret', 'homemavestruz');

app.use(express.static('./public'));
app.use(bodyParser.json());
consign({ cwd : 'app'})
	.include('models')
	.then('api')
	.then('routes/auth.js') // garante que o modulo auth seja carregado antes de todas as rotas
	.then('routes')
	.into(app);

module.exports = app; 

