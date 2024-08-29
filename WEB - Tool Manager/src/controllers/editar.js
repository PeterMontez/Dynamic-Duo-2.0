const ferramenta = require('../model/ferramenta');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');

module.exports = {
    async ferramenta(req, res){
        const cartao = req.body.cartao;

        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {CARTAO: cartao}
        });

        const ferramentas = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS', 'EDV']
        });

        const tipos = await tipo.findAll({
            raw: true,
            attributes: ['IDTipo', 'IDENTIFICACAO']
        });

        const subtipos = await subtipo.findAll({
            raw: true,
            attributes: ['IDSubtipo', 'IDENTIFICACAO', 'IDTipo']
        });

        const armarios = await armario.findAll({
            raw: true,
            attributes: ['IDArmario', 'IDENTIFICACAO', 'TIPO', 'DIVISOES']
        });

        const gavetas = await gaveta.findAll({
            raw: true,
            attributes: ['IDGaveta', 'IDENTIFICACAO', 'CONTEUDO', 'IDArmario']
        });

        const compartimentos = await compartimento.findAll({
            raw: true,
            attributes: ['IDCompartimento', 'IDENTIFICACAO', 'IDGaveta']
        });

        let edv = pessoa[0].EDV;

        res.render('../views/editar', {edv,colaboradores,cartao, pessoa, tipos, subtipos, armarios, gavetas, compartimentos, ferramentas,
            SelectedTipo:'', SelectedSubtipo:'', SelectedArmario:'', SelectedGaveta:'',SelectedCompartimento:'',
            SelectedIdentificacao:'',
            SelectedDescricao:'',
            SelectedStatus:'', send:false})
    },

}