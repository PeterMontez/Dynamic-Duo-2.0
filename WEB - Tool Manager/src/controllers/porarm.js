// Importando as tabelas do DB
const colaborador = require('../model/colaborador');
const armario = require('../model/armario');
const compartimento = require('../model/compartimento');
const ferramenta = require('../model/ferramenta');
const gaveta = require('../model/gaveta');
const subtipo = require('../model/subtipo');
const tipo = require('../model/tipo');


module.exports = {
    async armarios(req, res) {
        const excluirid = -1;
        const EDV = req.params.EDV;
        const id = -1;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const SelectItem = await armario.findAll({
                raw: true,
                attributes: ['IDArmario', 'IDENTIFICACAO']
            });
        const item = "Armários"
        res.render('../views/armarios', {item, SelectItem, EDV, id, excluirid, pessoa, excluir:false});
    },

    async gavetas(req, res) {
        const excluirid = -1;
        const EDV = req.params.EDV;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const id = req.params.armario;
        const SelectItem = await gaveta.findAll({
                raw: true,
                attributes: ['IDGaveta', 'IDENTIFICACAO', 'CONTEUDO'],
                where: { IDArmario: id }
            });
        const item = "Gavetas"
        res.render('../views/armarios', {item, SelectItem, EDV, id, pessoa, excluirid, excluir:false});
    },

    async compartimentos(req, res) {
        const excluirid = -1;
        const EDV = req.params.EDV;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const id = req.params.gaveta;
        const SelectItem = await compartimento.findAll({
                raw: true,
                attributes: ['IDCompartimento', 'IDENTIFICACAO'],
                where: { IDGaveta: id }
            });
        const item = "Compartimentos"
        res.render('../views/armarios', {item, SelectItem, EDV, id, pessoa, excluirid, excluir:false});
    },

    async ferramentas(req, res) {
        const excluirid = -1;
        const EDV = req.params.EDV;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
        })
        const id = req.params.compartimento;
        const SelectItem = await ferramenta.findAll({
                raw: true,
                attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS', 'EDV'],
                where: { IDCompartimento: id }
            });
        const item = "Ferramentas"
        res.render('../views/armarios', {item, SelectItem, EDV, id, pessoa, excluirid, colaboradores, excluir:false});
    },

}
