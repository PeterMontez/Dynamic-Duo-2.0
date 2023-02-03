const ferramenta = require('../model/ferramenta');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const colaborador = require('../model/colaborador')

module.exports = {
    async openExcluir(req, res){
        const EDV = req.params.EDV;
        const item = req.params.item;
        const excluirid = req.params.id;
        const id = req.params.lastid;
        const idsub = req.params.idsub;

        const pessoa = await colaborador.findAll({
            raw:true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {EDV: EDV}
        })

        if (item == 'Armários') {
            const SelectItem = await armario.findAll({
                raw: true,
                attributes: ['IDArmario', 'IDENTIFICACAO']
            });
            res.render('../views/armarios', {pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});
        }

        if (item == 'Gavetas') {
            const SelectItem = await gaveta.findAll({
                raw: true,
                attributes: ['IDGaveta', 'IDENTIFICACAO', 'CONTEUDO'],
                where: { IDArmario: id }
            });
            res.render('../views/armarios', {pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});
        }

        if (item == 'Compartimentos') {
            const SelectItem = await compartimento.findAll({
                raw: true,
                attributes: ['IDCompartimento', 'IDENTIFICACAO'],
                where: { IDGaveta: id }
            });
            res.render('../views/armarios', {pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});
        }

        if (item == 'Ferramentas' && idsub == -1) {
            const SelectItem = await ferramenta.findAll({
                raw: true,
                attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS'],
                where: { IDCompartimento: id }
            });
            const colaboradores = await colaborador.findAll({
                raw: true,
                attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            })
            res.render('../views/armarios', {colaboradores, pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});

        }

        if (item == 'Tipos de Ferramenta') {
            const SelectItem = await tipo.findAll({
                raw: true,
                attributes: ['IDTipo', 'IDENTIFICACAO']
            });
            res.render('../views/ferramentas', {pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});

        }

        if (item == 'Subtipos') {
            const SelectItem = await subtipo.findAll({
                raw: true,
                attributes: ['IDSubtipo', 'IDENTIFICACAO', 'IDTipo'],
                where: { IDTipo: id }
            });
        const item = "Subtipos"
                        res.render('../views/ferramentas', {pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});

        }
        
        if (item == 'Ferramentas' && idsub != -1) {
            const SelectItem = await ferramenta.findAll({
                raw: true,
                attributes: ['IDFerramenta', 'IDENTIFICACAO', 'DESCRICAO', 'STATUS'],
                where: { IDTipo: id, IDSubtipo : idsub}
            });
            const colaboradores = await colaborador.findAll({
                raw: true,
                attributes:['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            })
                        res.render('../views/ferramentas', {colaboradores ,pessoa, item, SelectItem, EDV, id, excluirid, excluir:true});

        }

    },

    async excluir(req, res) {
        const id = req.params.id;
        const item = req.params.item;

        console.log('ENTROU NA FUNCAO')

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
        }

        res.render('../views/index', {retirar:false, devolver:false, mensage:'', devolverEdv:false, retirarEdv:false, cadastrarEdv:false, cadastrar:false});

    },

}