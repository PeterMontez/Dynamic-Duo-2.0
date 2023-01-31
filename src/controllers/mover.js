// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const colaborador = require('../model/colaborador');

module.exports = {
    async retirar(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.ferramenta;

        console.log(EDV)

        await ferramenta.update({
            EDV: EDV,
            STATUS: 'Retirada',
        },
        {
            where: { IDFerramenta: id }
        });


        res.render('../views/index', {retirar:false, devolver:false, cadastrar:false});
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

        res.render('../views/index', {retirar:false, devolver:false, cadastrar:false});
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

        res.render('../views/confirmacao', {ferramentas, EDV, tipos, subtipos, armarios, gavetas, compartimentos, acao})
    },

    async confirmaretirada(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.ferramenta;

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
