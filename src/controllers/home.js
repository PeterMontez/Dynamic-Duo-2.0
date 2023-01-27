const ferramenta = require('../model/ferramenta');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');

module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index', {retirar:false, devolver:false, cadastrar:false});
    },
    async pagInicialPost(req, res){
        
    },
    async openCadastro(req, res){
        const ferramentas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'OBS', 'STATUS', 'EDV']
        });

        const tipos = await tipo.findAll({
            raw: true,
            attributes: ['IDTipo', 'IDENTIFICACAO']
        });

        const subtipos = await subtipo.findAll({
            raw: true,
            attributes: ['IDSubtipo', 'IDENTIFICACAO', 'IDTipo']
        });

        const armarios = await armario.findAll({
            raw: true,
            attributes: ['IDArmario', 'IDENTIFICACAO', 'TIPO', 'DIVISOES']
        });

        const gavetas = await gaveta.findAll({
            raw: true,
            attributes: ['IDGaveta', 'IDENTIFICACAO', 'CONTEUDO', 'IDArmario']
        });

        const compartimentos = await compartimento.findAll({
            raw: true,
            attributes: ['IDCompartimento', 'IDENTIFICACAO', 'IDGaveta']
        });

        res.render('../views/index', {retirar:false, devolver:false, cadastrar:true, tipos, subtipos, armarios, gavetas, compartimentos, ferramentas})
    },
    
    async openDevolver(req, res){
        res.render('../views/index', {retirar:false, devolver:true, cadastrar:false});
    },
    async openRetirar(req, res){
        res.render('../views/index', {retirar:true, devolver:false, cadastrar:false});
    },
}