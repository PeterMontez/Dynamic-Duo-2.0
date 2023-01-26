// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');
const retirar = require('./src/controllers/retirar')
const porarm = require('./src/controllers/porarm');
const porfer = require('./src/controllers/porfer');
const mover = require('./src/controllers/mover');
const cadastro = require('./src/controllers/cadastro');

// Iniciando as rotas
route.get('/', home.pagInicialGet);
route.post('/pushDevolver', home.openDevolver)
route.post('/pushRetirar', home.openRetirar)
route.post('/pushCadastro', home.openCadastro)
route.post('/retirar', retirar.pagRetirarGet)


//Retirar por armário
route.get('/armarios/:EDV', porarm.armarios);
route.get('/gavetas/:EDV/:armario', porarm.gavetas);
route.get('/compartimentos/:EDV/:gaveta', porarm.compartimentos);
route.get('/pa-ferramentas/:EDV/:compartimento', porarm.ferramentas);

//Retirar por ferramenta
route.get('/tipo/:EDV', porfer.tipos);
route.get('/subtipo/:EDV/:tipo', porfer.subtipos);
route.get('/pf-ferramentas/:EDV/:tipo/:subtipo', porfer.ferramentas);

route.get('/devolver/:EDV', mover.exibir);
route.post('/devolver/:EDV/:ferramenta', mover.devolver);
route.post('/retirar/:EDV/:ferramenta', mover.retirar);

// TODO
//Cadastrar Armario 
//Cadastrar Gavetas
//Cadastrar Ferramenta

module.exports = route;