// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');
const retirar = require('./src/controllers/retirar')
const devolver = require('./src/controllers/devolver')
const porarm = require('./src/controllers/porarm');
const porfer = require('./src/controllers/porfer');
const mover = require('./src/controllers/mover');
const cadastro = require('./src/controllers/cadastro');
const update = require('./src/controllers/update');
const excluir = require('./src/controllers/excluir');

// Iniciando as rotas
route.get('/', home.pagInicialGet);
route.post('/pushDevolver', home.openDevolver)
route.post('/pushRetirar', home.openRetirar)
route.post('/pushCadastro', home.openCadastro)
route.post('/retirarPorEdv', home.openRetirarEdv)
route.post('/devolverPorEdv', home.openDevolverEdv)
route.post('/cadastrarPorEdv', home.openCadastroEdv)
route.post('/Cadastro', home.pagCadastroGet)
route.post('/retirar', retirar.pagRetirarGet)
route.post('/devolver', devolver.pagDevolverGet)

//Retirar por armário
route.get('/armarios/:EDV', porarm.armarios);
route.get('/gavetas/:EDV/:armario', porarm.gavetas);
route.get('/compartimentos/:EDV/:gaveta', porarm.compartimentos);
route.get('/pa-ferramentas/:EDV/:compartimento', porarm.ferramentas);

//Retirar por ferramenta
route.get('/tipo/:EDV', porfer.tipos);
route.get('/subtipo/:EDV/:tipo', porfer.subtipos);
route.get('/pf-ferramentas/:EDV/:tipo/:subtipo', porfer.ferramentas);

//Geral
route.get('/mover/:EDV', mover.exibir);
route.post('/devolver/:EDV/:ferramenta', mover.devolver);
route.post('/retirar/:EDV/:ferramenta', mover.retirar);
route.get('/confirmaretirada/:EDV/:ferramenta', mover.confirmaretirada)
route.get('/confirmadevolucao/:EDV/:ferramenta', mover.confirmadevolucao)

//Cadastro
route.post('/cadastrar/armario', cadastro.cadastraarmario);
route.post('/cadastrar/gaveta', cadastro.cadastragaveta);
route.post('/cadastrar/ferramenta', cadastro.cadastraferramenta);
route.post('/cadastra/tipo', cadastro.cadastratipo);
route.post('/cadastra/subtipo', cadastro.cadastrasubtipo);

// Cadastro de colaborador
route.post('/cadastra/colaborador', cadastro.cadastracolaborador);

// Excluir items
route.post('/pushExcluir/:EDV/:item/:id/:lastid/:idsub', excluir.openExcluir)
route.post('/closeExcluir/:EDV/:item/:id/:lastid/:idsub', excluir.closeExcluir)
route.post('/excluir/:EDV/:item/:id', excluir.excluir)

//editar objetos
route.post('/editar/ferramenta/:id', update.ferramenta)
route.post('/editar/armario/:id', update.armario)
route.post('/editar/gaveta/:id', update.gaveta)
route.post('/editar/compartimento/:id', update.compartimento)
route.post('/editar/tipo/:id', update.tipo)
route.post('/editar/subtipo/:id', update.subtipo)

// TODO
//Cadastrar Armario 
//Cadastrar Gavetas
//Cadastrar Ferramenta

module.exports = route;