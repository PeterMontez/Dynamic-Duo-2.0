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

    async excluir(req, res){
        const id = req.params.id;
        const item = req.params.item;

        if (item == 'Armários') {
            await ferramenta.destroy({
                where: { IDArmario: id },
            });

            await compartimento.destroy({
                where: { IDArmario: id },
            });

            await gaveta.destroy({
                where: { IDArmario: id },
            });

            await armario.destroy({
                where: { IDArmario: id },
            });
        }

        if (item == 'Gavetas') {
            await ferramenta.destroy({
                where: { IDGaveta: id },
            });

            await compartimento.destroy({
                where: { IDGaveta: id },
            });

            await gaveta.destroy({
                where: { IDGaveta: id },
            });
        }

        if (item == 'Compartimentos') {
            await ferramenta.destroy({
                where: { IDCompartimento: id },
            });

            await compartimento.destroy({
                where: { IDCompartimento: id },
            });
        }

        if (item == 'Ferramentas') {
            await ferramenta.destroy({
                where: { IDFerramenta: id },
            });
        }

        if (item == 'Tipos de Ferramenta') {
            await ferramenta.destroy({
                where: { IDTipo: id },
            });

            await subtipo.destroy({
                where: { IDTipo: id },
            });

            await tipo.destroy({
                where: { IDTipo: id },
            });
        }

        if (item == 'Subtipos') {
            await ferramenta.destroy({
                where: { IDSubtipo: id },
            });

            await subtipo.destroy({
                where: { IDSubtipo: id },
            });

            await tipo.destroy({
                where: { IDSubtipo: id },
            });
        }

    },

}