const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');

module.exports = {
    async pagDevolverGet(req, res){
        const EDV = req.body.edv
        console.log(req.body);

        const ferramentas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'IDTipo'],
            where: { EDV: EDV }
        });

        res.render('../views/devolver', {EDV, ferramentas});
    },

}