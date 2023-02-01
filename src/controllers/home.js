const colaborador = require('../model/colaborador');
const ferramenta = require('../model/ferramenta');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');

module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index', {
            retirar: false, devolver: false, cadastrar: false,
            retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: ''
        });
    },
    async pagCadastroGet(req, res) {

        const EDV = req.body.edv;
        const cartao = req.body.cartao;

        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });
        PorCartao: {
            if (cartao != '') {
                const pessoa = await colaborador.findAll({
                    raw: true,
                    attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN'],
                    where: { CARTAO: cartao }
                });

                if (pessoa[0] == undefined) {
                    if (pessoa[0] == undefined) {
                        res.render('../views/index', {
                            retirar: false, devolver: false, cadastrar: false,
                            retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: 'Pessoa nao cadastrada'
                        });
                        break PorCartao;
                    }
                }

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

                res.render('../views/cadastro', {
                    edv, colaboradores, cartao, pessoa, tipos, subtipos, armarios, gavetas, compartimentos, ferramentas,
                    SelectedTipo: '', SelectedSubtipo: '', SelectedArmario: '', SelectedGaveta: '', SelectedCompartimento: '',
                    SelectedIdentificacao: '',
                    SelectedDescricao: '',
                    SelectedStatus: '', send: false
                })
            }
        }
        PorEdv: {
            if (EDV != '') {
                const pessoa = await colaborador.findAll({
                    raw: true,
                    attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN'],
                    where: { EDV: EDV }
                });

                if (pessoa[0] == undefined) {
                    if (pessoa[0] == undefined) {
                        res.render('../views/index', {
                            retirar: false, devolver: false, cadastrar: false,
                            retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: 'Pessoa nao cadastrada'
                        });
                        break PorEdv;
                    }
                }

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

                res.render('../views/cadastro', {
                    edv, colaboradores, cartao, pessoa, tipos, subtipos, armarios, gavetas, compartimentos, ferramentas,
                    SelectedTipo: '', SelectedSubtipo: '', SelectedArmario: '', SelectedGaveta: '', SelectedCompartimento: '',
                    SelectedIdentificacao: '',
                    SelectedDescricao: '',
                    SelectedStatus: '', send: false
                })
            }
        }
    },

    async openRetirar(req, res) {
        res.render('../views/index', { retirar: true, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async openDevolver(req, res) {
        res.render('../views/index', { retirar: false, devolver: true, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async openCadastro(req, res) {
        res.render('../views/index', { retirar: false, devolver: false, cadastrar: true, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async openRetirarEdv(req, res) {
        res.render('../views/index', { retirar: true, devolver: false, cadastrar: false, retirarEdv: true, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async openDevolverEdv(req, res) {
        res.render('../views/index', { retirar: false, devolver: true, cadastrar: false, retirarEdv: false, devolverEdv: true, cadastrarEdv: false, mensage: '' });
    },

    async openCadastroEdv(req, res) {
        res.render('../views/index', { retirar: false, devolver: false, cadastrar: true, retirarEdv: false, devolverEdv: false, cadastrarEdv: true, mensage: '' });
    },
}