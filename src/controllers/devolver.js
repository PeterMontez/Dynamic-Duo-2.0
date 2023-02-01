const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const colaborador = require('../model/colaborador');

module.exports = {
    async pagDevolverGet(req, res){
        const EDV = req.body.edv
        const cartao = req.body.cartao
        if (cartao != '') {
            const pessoa = await colaborador.findAll({
                raw: true,
                attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
                where: {CARTAO: cartao},
            });
        }

        const ferramentas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS', 'IDTipo', 'IDSubtipo', 'IDArmario', 'IDGaveta', 'IDCompartimento'],
            where: { EDV: pessoa[0].EDV },
        });

        const tipos = [];
        const subtipos = [];
        const armarios = [];
        const gavetas = [];
        const compartimentos = [];

        for (let i = 0; i < ferramentas.length; i++) {
            var temp = await tipo.findAll({
                raw: true,
                attributes: ['IDENTIFICACAO'],
                where: { IDTipo: ferramentas[i].IDTipo }
            })
            tipos.push(temp[0].IDENTIFICACAO);

            temp = await armario.findAll({
                raw: true,
                attributes: ['IDENTIFICACAO'],
                where: { IDArmario: ferramentas[i].IDArmario }
            })
            armarios.push(temp[0].IDENTIFICACAO);

            temp = await gaveta.findAll({
                raw: true,
                attributes: ['IDENTIFICACAO'],
                where: { IDGaveta: ferramentas[i].IDGaveta }
            })
            gavetas.push(temp[0].IDENTIFICACAO);

            temp = await compartimento.findAll({
                raw: true,
                attributes: ['IDENTIFICACAO'],
                where: { IDCompartimento: ferramentas[i].IDCompartimento }
            })
            compartimentos.push(temp[0].IDENTIFICACAO);

            temp = await subtipo.findAll({
                raw: true,
                attributes: ['IDENTIFICACAO'],
                where: { IDSubtipo: ferramentas[i].IDSubtipo }
            })

            if (temp.length == 0) {
                subtipos.push('-----');
            }
            else {
                subtipos.push(temp[0].IDENTIFICACAO);
            }

        }

        res.render('../views/devolver', {EDV, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, pessoa});
    },

}