const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const colaborador = require('../model/colaborador');

module.exports = {
    async ferramenta(req, res) {
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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });
        const item = 'Ferramenta'
        const dados = req.body
        const armarioSelected = dados.armario;
        const gavetaSelected = dados.gaveta;
        const compartimentoSelected = dados.compartimento;
        const condicao = dados.send
        const id = req.params.id
        console.log(dados.tipo);
        console.log(dados.subtipo);
        console.log(dados.armario);
        console.log(dados.gaveta);
        console.log(dados.compartimento);
        let edv = req.params.EDV
        console.log(edv)

        if (edv==undefined) {
            edv = EDV
        }
        else{
            const EDV = edv
        }
        const EDV = edv

        const EditItem = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS', 'EDV', 'IDTipo', 'IDSubtipo', 'IDCompartimento', 'IDGaveta', 'IDArmario'],
            where: { IDFerramenta: id }
        });
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });

        if ((armarioSelected == undefined || gavetaSelected == undefined || compartimentoSelected == undefined) || !condicao) {


            res.render('../views/editar.ejs', {
                id, item,edv,EDV, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores,
                SelectedTipo: dados.tipo, SelectedSubtipo: dados.subtipo, SelectedArmario: dados.armario, SelectedGaveta: dados.gaveta, SelectedCompartimento: dados.compartimento,
                SelectedIdentificacao: dados.identificacao, SelectedDescricao: dados.descricao, SelectedStatus: dados.status, condicao: false
            });
        }
        else{

            await ferramenta.update({
                IDENTIFICACAO: dados.identificacao,
                STATUS: dados.status,
                DESCRICAO: dados.descricao,
                IDTipo: dados.tipo,
                IDSubtipo: dados.subtipo,
                IDArmario: dados.armario,
                IDGaveta: dados.gaveta,
                IDCompartimento: dados.compartimento,
            },
                {
                    where: { IDFerramenta: id }
                });
            res.render('../views/index', { retirar: false, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
        }
    },

    async armario(req, res) {
        const id = req.params.id
        const dados = req.body

        await armario.update({
            IDENTIFICACAO: dados.identificacao,
            DIVISOES: dados.DIVISOES,
            TIPO: dados.TIPO,
        },
            {
                where: { IDArmario: id }
            });

        res.render('../views/index', { retirar: false, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async gaveta(req, res) {
        const id = req.params.id
        const dados = req.body

        console.log('entrou');

        await gaveta.update({
            IDENTIFICACAO: dados.identificacao,
            CONTEUDO: dados.conteudo,
        },
            {
                where: { IDGaveta: id }
            });

        res.render('../views/index', { retirar: false, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async compartimento(req, res) {
        const id = req.params.id
        const dados = req.body

        await compartimento.update({
            IDENTIFICACAO: dados.identificacao,
        },
            {
                where: { IDCompartimento: id }
            });

        res.render('../views/index', { retirar: false, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async tipo(req, res) {
        const id = req.params.id
        const dados = req.body

        await tipo.update({
            IDENTIFICACAO: dados.identificacao,
        },
            {
                where: { IDTipo: id }
            });

        res.render('../views/index', { retirar: false, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async subtipo(req, res) {
        const id = req.params.id
        const dados = req.body

        await subtipo.update({
            IDENTIFICACAO: dados.identificacao,
        },
            {
                where: { IDSubtipo: id }
            });

        res.render('../views/index', { retirar: false, devolver: false, cadastrar: false, retirarEdv: false, devolverEdv: false, cadastrarEdv: false, mensage: '' });
    },

    async excluir(req, res) {
        const id = req.params.id;
        const item = req.params.item;

        if (item == 'Armários') {
            await ferramenta.destroy({
                where: { IDArmario: id },
            });

            await compartimento.destroy({
                where: { IDArmario: id },
            });

            await gaveta.destroy({
                where: { IDArmario: id },
            });

            await armario.destroy({
                where: { IDArmario: id },
            });
        }

        if (item == 'Gavetas') {
            await ferramenta.destroy({
                where: { IDGaveta: id },
            });

            await compartimento.destroy({
                where: { IDGaveta: id },
            });

            await gaveta.destroy({
                where: { IDGaveta: id },
            });
        }

        if (item == 'Compartimentos') {
            await ferramenta.destroy({
                where: { IDCompartimento: id },
            });

            await compartimento.destroy({
                where: { IDCompartimento: id },
            });
        }

        if (item == 'Ferramentas') {
            await ferramenta.destroy({
                where: { IDFerramenta: id },
            });
        }

        if (item == 'Tipos de Ferramenta') {
            await ferramenta.destroy({
                where: { IDTipo: id },
            });

            await subtipo.destroy({
                where: { IDTipo: id },
            });

            await tipo.destroy({
                where: { IDTipo: id },
            });
        }

        if (item == 'Subtipos') {
            await ferramenta.destroy({
                where: { IDSubtipo: id },
            });

            await subtipo.destroy({
                where: { IDSubtipo: id },
            });

            await tipo.destroy({
                where: { IDSubtipo: id },
            });
        }

    },


    async pusharmario(req, res) {
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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Armario'
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });
        const EditItem = await armario.findAll({
            raw: true,
            attributes: ['IDArmario', 'IDENTIFICACAO', 'TIPO', 'DIVISOES'],
            where: { IDArmario: id }
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', { id, item, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores })
    },
    async pushgaveta(req, res) {

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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Gaveta'
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });
        const EditItem = await gaveta.findAll({
            raw: true,
            attributes: ['IDGaveta', 'IDENTIFICACAO', 'CONTEUDO'],
            where: { IDGaveta: id }
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', { id, item, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores })
    },
    async pushcompartimento(req, res) {

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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Compartimento'
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });
        const EditItem = await compartimento.findAll({
            raw: true,
            attributes: ['IDCompartimento', 'IDENTIFICACAO'],
            where: { IDCompartimento: id }
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', { id, item, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores })
    },
    async pushtipo(req, res) {

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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Tipo'
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });
        const EditItem = await tipo.findAll({
            raw: true,
            attributes: ['IDTipo', 'IDENTIFICACAO'],
            where: { IDTipo: id }
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', { id, item, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores })
    },
    async pushsubtipo(req, res) {

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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Subtipo'
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });
        const EditItem = await subtipo.findAll({
            raw: true,
            attributes: ['IDSubtipo', 'IDENTIFICACAO'],
            where: { IDSubtipo: id }
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', { id, item, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores })
    },
    async pushferramenta(req, res) {

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
        const colaboradores = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO', 'ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Ferramenta'
        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV', 'IDENTIFICACAO', 'CARTAO'],
            where: { EDV: edv }
        });
        const EditItem = await ferramenta.findAll({
            raw: true,
            attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS', 'EDV', 'IDTipo', 'IDSubtipo', 'IDCompartimento', 'IDGaveta', 'IDArmario'],
            where: { IDFerramenta: id }
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', { id, item, pessoa, EditItem, ferramentas, tipos, subtipos, armarios, gavetas, compartimentos, colaboradores,
            SelectedTipo: EditItem[0].IDTipo, SelectedSubtipo: EditItem[0].IDSubtipo, SelectedArmario: EditItem[0].IDArmario, SelectedGaveta: EditItem[0].IDGaveta, SelectedCompartimento: EditItem[0].IDCompartimento,
            SelectedIdentificacao: EditItem[0].IDENTIFICACAO, SelectedDescricao: EditItem[0].DESCRICAO, SelectedStatus: EditItem[0].STATUS, condicao: false })
    },
}