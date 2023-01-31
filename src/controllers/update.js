const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');

module.exports = {
    async ferramenta(req, res){
        const id = req.params.id
        const dados = req.body

        await ferramenta.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
            STATUS: dados.STATUS,
            DESCRICAO: dados.DESCRICAO,
            IDTipo: dados.IDTipo,
            IDSubtipo: dados.IDSubtipo,
            IDArmario: dados.IDArmario,
            IDGaveta: dados.IDGaveta,
            IDCompartimento: dados.IDCompartimento,
        },
        {
            where: { IDFerramenta: id }
        });

        res.render('../views/index');
    },

    async armario(req, res){
        const id = req.params.id
        const dados = req.body

        await armario.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
            DIVISOES: dados.DIVISOES,
            TIPO: dados.TIPO,
        },
        {
            where: { IDArmario: id }
        });

        res.render('../views/index');
    },

    async gaveta(req, res){
        const id = req.params.id
        const dados = req.body

        await gaveta.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
            CONTEUDO: dados.CONTEUDO,
        },
        {
            where: { IDGaveta: id }
        });

        res.render('../views/index');
    },

    async compartimento(req, res){
        const id = req.params.id
        const dados = req.body

        await compartimento.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
        },
        {
            where: { IDCompartimento: id }
        });

        res.render('../views/index');
    },

    async tipo(req, res){
        const id = req.params.id
        const dados = req.body

        await tipo.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
        },
        {
            where: { IDTipo: id }
        });

        res.render('../views/index');
    },

    async subtipo(req, res){
        const id = req.params.id
        const dados = req.body

        await subtipo.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
        },
        {
            where: { IDSubtipo: id }
        });

        res.render('../views/index');
    },

}