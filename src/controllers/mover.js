// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');

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


        res.redirect('../views/index', {retirar:false, devolver:false});
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

        res.redirect('../views/index', {retirar:false, devolver:false});
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

}
