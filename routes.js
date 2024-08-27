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
route.get('/ToolManager', home.pagInicialGet);
route.post('/ToolManager/pushDevolver', home.openDevolver)
route.post('/ToolManager/pushRetirar', home.openRetirar)
route.post('/ToolManager/pushCadastro', home.openCadastro)
route.post('/ToolManager/retirarPorEdv', home.openRetirarEdv)
route.post('/ToolManager/devolverPorEdv', home.openDevolverEdv)
route.post('/ToolManager/cadastrarPorEdv', home.openCadastroEdv)
route.post('/ToolManager/Cadastro', home.pagCadastroGet)
route.post('/ToolManager/retirar', retirar.pagRetirarGet)
route.post('/ToolManager/devolver', devolver.pagDevolverGet)

//Retirar por armário
route.get('/ToolManager/armarios/:EDV', porarm.armarios);
route.get('/ToolManager/gavetas/:EDV/:armario', porarm.gavetas);
route.get('/ToolManager/compartimentos/:EDV/:gaveta', porarm.compartimentos);
route.get('/ToolManager/pa-ferramentas/:EDV/:compartimento', porarm.ferramentas);

//Retirar por ferramenta
route.get('/ToolManager/tipo/:EDV', porfer.tipos);
route.get('/ToolManager/subtipo/:EDV/:tipo', porfer.subtipos);
route.get('/ToolManager/pf-ferramentas/:EDV/:tipo/:subtipo', porfer.ferramentas);

//Geral
route.get('/ToolManager/mover/:EDV', mover.exibir);
route.post('/ToolManager/devolver/:EDV/:ferramenta', mover.devolver);
route.post('/ToolManager/retirar/:EDV/:ferramenta', mover.retirar);
route.get('/ToolManager/confirmaretirada/:EDV/:ferramenta', mover.confirmaretirada)
route.get('/ToolManager/confirmadevolucao/:EDV/:ferramenta', mover.confirmadevolucao)

//Cadastro
route.post('/ToolManager/cadastrar/armario', cadastro.cadastraarmario);
route.post('/ToolManager/cadastrar/gaveta', cadastro.cadastragaveta);
route.post('/ToolManager/cadastrar/ferramenta', cadastro.cadastraferramenta);
route.post('/ToolManager/cadastra/tipo', cadastro.cadastratipo);
route.post('/ToolManager/cadastra/subtipo', cadastro.cadastrasubtipo);

// Cadastro de colaborador
route.post('/ToolManager/cadastra/colaborador', cadastro.cadastracolaborador);

// Excluir items
route.post('/ToolManager/pushExcluir/:EDV/:item/:id/:lastid/:idsub', excluir.openExcluir)
route.post('/ToolManager/excluir/:EDV/:item/:id', excluir.excluir)


// Editar Objetos
route.get('/ToolManager/pushEditar/:EDV/ferramenta/:id/', update.pushferramenta)
route.get('/ToolManager/pushEditar/:EDV/armario/:id', update.pusharmario)
route.get('/ToolManager/pushEditar/:EDV/gaveta/:id', update.pushgaveta)
route.get('/ToolManager/pushEditar/:EDV/compartimento/:id', update.pushcompartimento)
route.get('/ToolManager/pushEditar/:EDV/tipo/:id', update.pushtipo)
route.get('/ToolManager/pushEditar/:EDV/subtipo/:id', update.pushsubtipo)
route.post('/ToolManager/editar/:EDV/ferramenta/:id', update.ferramenta)
route.post('/ToolManager/editar/:EDV/armario/:id', update.armario)
route.post('/ToolManager/editar/:EDV/gaveta/:id', update.gaveta)
route.post('/ToolManager/editar/:EDV/compartimento/:id', update.compartimento)
route.post('/ToolManager/editar/:EDV/tipo/:id', update.tipo)
route.post('/ToolManager/editar/:EDV/subtipo/:id', update.subtipo)


module.exports = route;