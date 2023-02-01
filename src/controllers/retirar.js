const colaboradores = require('../model/colaborador');

module.exports = {
    async pagRetirarGet(req, res){
        const cartao = req.body.cartao;
        const edv = req.body.edv;
        console.log(cartao);
        console.log(edv);
        if (cartao != '') {
            const pessoa = await colaboradores.findAll({
                raw: true,
                attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
                where: {CARTAO: cartao}
            });
            if (pessoa[0] == undefined) {
                res.render('../views/index', {retirar:false, devolver:false, cadastrar:false,
                                             retirarEdv:false, devolverEdv:false, cadastrarEdv:false,mensage:'Pessoa nao cadastrada'});
            }
            res.render('../views/retirar', {pessoa});
        };
        if (edv != '') {
            const pessoa = await colaboradores.findAll({
                raw: true,
                attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
                where: {EDV: edv}
            });
            if (pessoa[0] == undefined) {
                res.render('../views/index', {retirar:false, devolver:false, cadastrar:false,
                                             retirarEdv:false, devolverEdv:false, cadastrarEdv:false,mensage:'Pessoa nao cadastrada'});
            }
            res.render('../views/retirar', {pessoa});
        }

    },
}