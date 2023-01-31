const colaboradores = require('../model/colaborador');

module.exports = {
    async pagRetirarGet(req, res){
        const cartao = req.body.cartao;

        const pessoa = await colaboradores.findAll({
            raw: true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {CARTAO: cartao}
        });

        console.log(req.body);
        
        res.render('../views/retirar', {pessoa});
    },
}