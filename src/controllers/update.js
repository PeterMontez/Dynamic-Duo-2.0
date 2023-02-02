const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const colaborador = require('../model/colaborador');

module.exports = {
    async ferramenta(req, res){

        const id = req.params.id
        const dados = req.body

        await ferramenta.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
            STATUS: dados.STATUS,
            DESCRICAO: dados.DESCRICAO,
            IDTipo: dados.IDTipo,
            IDSubtipo: dados.IDSubtipo,
            IDArmario: dados.IDArmario,
            IDGaveta: dados.IDGaveta,
            IDCompartimento: dados.IDCompartimento,
        },
        {
            where: { IDFerramenta: id }
        });

        res.render('../views/index');
    },

    async armario(req, res){
        const id = req.params.id
        const dados = req.body

        await armario.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
            DIVISOES: dados.DIVISOES,
            TIPO: dados.TIPO,
        },
        {
            where: { IDArmario: id }
        });

        res.render('../views/index');
    },

    async gaveta(req, res){
        const id = req.params.id
        const dados = req.body

        console.log('entrou');

        await gaveta.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
            CONTEUDO: dados.CONTEUDO,
        },
        {
            where: { IDGaveta: id }
        });

        res.render('../views/index');
    },

    async compartimento(req, res){
        const id = req.params.id
        const dados = req.body

        await compartimento.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
        },
        {
            where: { IDCompartimento: id }
        });

        res.render('../views/index');
    },

    async tipo(req, res){
        const id = req.params.id
        const dados = req.body

        await tipo.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
        },
        {
            where: { IDTipo: id }
        });

        res.render('../views/index');
    },

    async subtipo(req, res){
        const id = req.params.id
        const dados = req.body

        await subtipo.update({
            IDENTIFICACAO: dados.IDENTIFICACAO,
        },
        {
            where: { IDSubtipo: id }
        });

        res.render('../views/index');
    },

    async excluir(req, res){
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


    async pusharmario(req, res){
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
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Armario'
        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO'],
            where: {EDV: edv}
        });
        const EditItem = await armario.findAll({
            raw:true,
            attributes: ['IDArmario','IDENTIFICACAO','TIPO','DIVISOES'],
            where: {IDArmario: id}
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', {id, item, pessoa,EditItem, ferramentas, tipos, subtipos,armarios,gavetas,compartimentos,colaboradores})
    },
    async pushgaveta(req, res){
        
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
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Gaveta'
        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO'],
            where: {EDV: edv}
        });
        const EditItem = await gaveta.findAll({
            raw:true,
            attributes: ['IDGaveta','IDENTIFICACAO','CONTEUDO'],
            where: {IDGaveta: id}
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', {id, item, pessoa,EditItem, ferramentas, tipos, subtipos,armarios,gavetas,compartimentos,colaboradores})
    },
    async pushcompartimento(req, res){
        
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
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Compartimento'
        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO'],
            where: {EDV: edv}
        });
        const EditItem = await compartimento.findAll({
            raw:true,
            attributes: ['IDCompartimento','IDENTIFICACAO'],
            where: {IDCompartimento: id}
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', {id, item, pessoa,EditItem, ferramentas, tipos, subtipos,armarios,gavetas,compartimentos,colaboradores})
    },
    async pushtipo(req, res){
        
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
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Tipo'
        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO'],
            where: {EDV: edv}
        });
        const EditItem = await tipo.findAll({
            raw:true,
            attributes: ['IDTipo','IDENTIFICACAO'],
            where: {IDTipo: id}
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', {id, item, pessoa,EditItem, ferramentas, tipos, subtipos,armarios,gavetas,compartimentos,colaboradores})
    },
    async pushsubtipo(req, res){
        
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
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Subtipo'
        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO'],
            where: {EDV: edv}
        });
        const EditItem = await armario.findAll({
            raw:true,
            attributes: ['IDSubtipo','IDENTIFICACAO'],
            where: {IDSubtipo: id}
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', {id, item, pessoa,EditItem, ferramentas, tipos, subtipos,armarios,gavetas,compartimentos,colaboradores})
    },
    async pushferramenta(req, res){
        
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
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN']
        });

        const id = req.params.id
        const edv = req.params.EDV
        const item = 'Ferramenta'
        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO'],
            where: {EDV: edv}
        });
        const EditItem = await armario.findAll({
            raw:true,
            attributes: ['IDFerramenta','IDENTIFICACAO','DESCRICAO','STATUS','EDV','IDTipo','IDSubtipo','IDCompartimetno','IDGaveta','IDArmario'],
            where: {IDFerramenta: id}
        });
        console.log(pessoa);
        res.render('../views/editar.ejs', {id, item, pessoa,EditItem, ferramentas, tipos, subtipos,armarios,gavetas,compartimentos,colaboradores})
    },  

}