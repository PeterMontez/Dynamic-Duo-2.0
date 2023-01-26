// Importando as tabelas do DB
const armario = require('../model/armario');
const compartimento = require('../model/compartimento');
const ferramenta = require('../model/ferramenta');
const gaveta = require('../model/gaveta');
const subtipo = require('../model/subtipo');
const tipo = require('../model/tipo');


module.exports = {
    async armarios(req, res) {
        const EDV = req.params.EDV;
        const SelectItem = await armario.findAll({
                raw: true,
                attributes: ['IDArmario', 'IDENTIFICACAO']
            });
        const item = "Armários"
        res.render('../views/armarios', {item, SelectItem, EDV});
    },

    async gavetas(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.armario;
        const SelectItem = await gaveta.findAll({
                raw: true,
                attributes: ['IDGaveta', 'IDENTIFICACAO', 'CONTEUDO'],
                where: { IDArmario: id }
            });
        const item = "Gavetas"
        res.render('../views/armarios', {item, SelectItem, EDV});
    },

    async compartimentos(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.gaveta;
        const SelectItem = await compartimento.findAll({
                raw: true,
                attributes: ['IDCompartimento', 'IDENTIFICACAO'],
                where: { IDGaveta: id }
            });
        const item = "Compartimentos"
        res.render('../views/armarios', {item, SelectItem, EDV});
    },

    async ferramentas(req, res) {
        const EDV = req.params.EDV;
        const id = req.params.compartimento;
        const SelectItem = await ferramenta.findAll({
                raw: true,
                attributes: ['IDFerramenta', 'IDENTIFICACAO', 'OBS', 'STATUS'],
                where: { IDCompartimento: id }
            });
        const item = "Ferramentas"
        res.render('../views/armarios', {item, SelectItem, EDV});
    },

}
