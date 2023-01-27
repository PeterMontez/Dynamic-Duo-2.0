// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');

module.exports = {
    async cadastraferramenta(req, res) {
        const dados = req.body;

        await ferramenta.create({
            IDENTIFICACAO: dados.identificacao,
            OBS: dados.obs,
            IDTipo: dados.tipo,
            IDSubstipo: dados.subtipo,
            IDCompartimento: dados.compartimento,
            IDGaveta: dados.gaveta,
            IDArmario: dados.armario

        });

        res.redirect('/');
    },

    async cadastraarmario(req, res) {
        const dados = req.body;

        await armario.create({
            TIPO: dados.tipo,
            DIVISOES: dados.divisoes,
            IDENTIFICACAO: dados.identificacao
            
        });

        res.redirect('/');
    },
// TODO: Cadastrar compartimentos juntos em um FOR
    async cadastragaveta(req, res) {
        const dados = req.body;

        await gaveta.create({
            IDENTIFICACAO: dados.identificacao,
            CONTEUDO: dados.conteudo,
            IDArmario: dados.armario
            
        });

        res.redirect('/');
    },

    async cadastracompartimento(req, res) {
        const dados = req.body;

        await compartimento.create({
            IDENTIFICACAO: dados.identificacao,
            IDGaveta: dados.gaveta
            
        });

        res.redirect('/');
    },

    async cadastratipo(req, res) {
        const dados = req.body;

        await tipo.create({
            IDENTIFICACAO: dados.identificacao
            
        });

        res.redirect('/');
    },

    async cadastrasubtipo(req, res) {
        const dados = req.body;

        await subtipo.create({
            IDENTIFICACAO: dados.identificacao,
            IDTipo: dados.tipo

        });

        res.redirect('/');
    },

}
