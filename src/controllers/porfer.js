// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const subtipo = require('../model/subtipo');
const tipo = require('../model/tipo');


module.exports = {
    async tipos(req, res) {
        const EDV = req.params.EDV;
        const SelectItem = await tipo.findAll({
                raw: true,
                attributes: ['IDTipo', 'IDENTIFICACAO']
            });
        const item = "Tipos de Ferramenta"
        res.render('../views/ferramentas', {item, SelectItem, EDV});
    },

    async subtipos(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.tipo;
        const SelectItem = await subtipo.findAll({
                raw: true,
                attributes: ['IDSubtipo', 'IDENTIFICACAO', 'IDTipo'],
                where: { IDTipo: id }
            });
        const item = "Subtipos"
        res.render('../views/ferramentas', {item, SelectItem, EDV});
    },

    async ferramentas(req, res) {

        const EDV = req.params.EDV;
        const idtipo = req.params.tipo;
        const idsubtipo = req.params.subtipo;
        const SelectItem = await ferramenta.findAll({
                raw: true,
                attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS'],
                where: { IDTipo: idtipo, IDSubtipo : idsubtipo}
            });
        const item = "Ferramentas"
        res.render('../views/ferramentas', {item, SelectItem, EDV});
    },

}
