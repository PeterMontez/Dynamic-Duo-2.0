// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const colaborador = require('../model/colaborador');
const subtipo = require('../model/subtipo');
const tipo = require('../model/tipo');


module.exports = {
    async tipos(req, res) {
        const excluirid = -1;
        const id = -1;
        const EDV = req.params.EDV;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const SelectItem = await tipo.findAll({
                raw: true,
                attributes: ['IDTipo', 'IDENTIFICACAO']
            });
        const item = "Tipos de Ferramenta"
        res.render('../views/ferramentas', {item, SelectItem, EDV, id, excluirid, pessoa, excluir:false});
    },

    async subtipos(req, res) {
        const excluirid = -1;
        const EDV = req.params.EDV;
        const id = req.params.tipo;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const SelectItem = await subtipo.findAll({
                raw: true,
                attributes: ['IDSubtipo', 'IDENTIFICACAO', 'IDTipo'],
                where: { IDTipo: id }
            });
        const item = "Subtipos"
        res.render('../views/ferramentas', {item, SelectItem, EDV, id, excluirid, pessoa, excluir:false});
    },

    async ferramentas(req, res) {
        const excluirid = -1;
        const id = -1;
        const EDV = req.params.EDV;
        const idtipo = req.params.tipo;
        const idsubtipo = req.params.subtipo;
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV:EDV}
        })
        const SelectItem = await ferramenta.findAll({
                raw: true,
                attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS'],
                where: { IDTipo: idtipo, IDSubtipo : idsubtipo}
            });
        const item = "Ferramentas"
        res.render('../views/ferramentas', {item, SelectItem, EDV, id, excluirid, pessoa, excluir:false});
    },

}
