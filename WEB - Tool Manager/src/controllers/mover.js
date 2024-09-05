// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const colaborador = require('../model/colaborador');

const Conection = require('../config/firebase');
module.exports = {
    async retirar(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.ferramenta;

        await ferramenta.update({
            EDV: EDV,
            STATUS: 'Retirada',
        },
        {
            where: { IDFerramenta: id }
        });

        const tool = await ferramenta.findAll({
            raw: true,
            attributes: ['IDGaveta','IDFerramenta','IDArmario']
        },{
            where: { IDFerramenta: id }
        });
        const armarinho = await armario.findAll({
            raw:true,
            attributes: ['IDArmario', 'IDENTIFICACAO']
        },
        {
            where: { IDArmario: tool.IDArmario }
        });
        const gavetinha = await gaveta.findAll({
            raw:true,
            attributes: ['IDGaveta', 'IDENTIFICACAO']
        },
        {
            where: { IDGaveta: tool.IDGaveta }
        })

        await Conection.open(armarinho[0].IDENTIFICACAO, gavetinha[0].IDENTIFICACAO);

        console.log(`ferramenta devolvida (${armarinho[0].IDENTIFICACAO} - ${gavetinha[0].IDENTIFICACAO} - ${tool[0].IDENTIFICACAO})`);

        await Conection.open('01','key');

        console.log("ferramenta retirada");

        setTimeout(function(){
            res.render('../views/index', {retirar:false, devolver:false, cadastrar:false,retirarEdv:false, devolverEdv:false, cadastrarEdv:false, mensage:''});
        }, 1500);
    },

    async devolver(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.ferramenta;

        await ferramenta.update({
            EDV: '',
            STATUS: '',
        },
        {
            where: { IDFerramenta: id }
        });

        const tool = await ferramenta.findAll({
            raw: true,
            attributes: ['IDGaveta','IDFerramenta','IDArmario']
        },{
            where: { IDFerramenta: id }
        });
        const armarinho = await armario.findAll({
            raw:true,
            attributes: ['IDArmario', 'IDENTIFICACAO']
        },
        {
            where: { IDArmario: tool.IDArmario }
        });
        const gavetinha = await gaveta.findAll({
            raw:true,
            attributes: ['IDGaveta', 'IDENTIFICACAO']
        },
        {
            where: { IDGaveta: tool.IDGaveta }
        })

        await Conection.open(armarinho[0].IDENTIFICACAO, gavetinha[0].IDENTIFICACAO);

        console.log(`ferramenta devolvida (${armarinho[0].IDENTIFICACAO} - ${gavetinha[0].IDENTIFICACAO} - ${tool[0].IDENTIFICACAO})`);


        setTimeout(function(){
            res.render('../views/index', {retirar:false, devolver:false, cadastrar:false,retirarEdv:false, devolverEdv:false, cadastrarEdv:false, mensage:''});
        }, 1500);

        
    },

    async exibir(req, res) {
        const EDV = req.params.EDV;

        const retiradas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO'],
            where: { EDV: EDV }
        });

        res.render('../views/index', {retiradas});
    },

    async confirmadevolucao(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.ferramenta;

        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV: EDV},
        });

        const ferramentas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'IDTipo', 'IDSubtipo', 'IDArmario', 'IDGaveta', 'IDCompartimento'],
            where: { IDFerramenta: id }
        });
        
        const tipos = (await tipo.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDTipo: ferramentas[0].IDTipo }
        }))[0].IDENTIFICACAO;

        var subtipos = (await subtipo.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDSubtipo: ferramentas[0].IDSubtipo }
        }))

        if (subtipos.length == 0) {
            subtipos = ' -----';
        }
        else {
            subtipos = subtipos[0].IDENTIFICACAO;
        }

        const armarios = (await armario.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDArmario: ferramentas[0].IDArmario }
        }))[0].IDENTIFICACAO;

        const gavetas = (await gaveta.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDGaveta: ferramentas[0].IDGaveta }
        }))[0].IDENTIFICACAO;

        const compartimentos = (await compartimento.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDCompartimento: ferramentas[0].IDCompartimento }
        }))[0].IDENTIFICACAO;

        const acao = 1;

        res.render('../views/confirmacao', {ferramentas, EDV, tipos, subtipos, armarios, gavetas, compartimentos, acao, pessoa})
    },

    async confirmaretirada(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.ferramenta;

        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV: EDV},
        });

        const ferramentas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'IDTipo', 'IDSubtipo', 'IDArmario', 'IDGaveta', 'IDCompartimento'],
            where: { IDFerramenta: id }
        });
        
        const tipos = (await tipo.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDTipo: ferramentas[0].IDTipo }
        }))[0].IDENTIFICACAO;

        var subtipos = (await subtipo.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDSubtipo: ferramentas[0].IDSubtipo }
        }))

        if (subtipos.length == 0) {
            subtipos = ' -----';
        }
        else {
            subtipos = subtipos[0].IDENTIFICACAO;
        }

        const armarios = (await armario.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDArmario: ferramentas[0].IDArmario }
        }))[0].IDENTIFICACAO;

        const gavetas = (await gaveta.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDGaveta: ferramentas[0].IDGaveta }
        }))[0].IDENTIFICACAO;

        const compartimentos = (await compartimento.findAll({
            raw: true,
            attributes: ['IDENTIFICACAO'],
            where: { IDCompartimento: ferramentas[0].IDCompartimento }
        }))[0].IDENTIFICACAO;

        const acao = 0;

        res.render('../views/confirmacao', {ferramentas, EDV, tipos, subtipos, armarios, gavetas, compartimentos, acao, pessoa})
    }
}
