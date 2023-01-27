const ferramenta = require('../model/ferramenta');

module.exports = {
    async pagDevolverGet(req, res){
        const EDV = req.body.edv
        console.log(req.body);

        const ferramentas = await ferramenta.findAll({
            raw: true,
            where: {
                EDV: EDV
            }
        })

        console.log(ferramentas);

        res.render('../views/devolver', {EDV, ferramentas});
    },

}