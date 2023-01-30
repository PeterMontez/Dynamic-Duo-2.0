// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');

module.exports = {
    async sla(req, res) {

    },
    async cadastraferramenta(req, res) {
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

        
        
        const dados = req.body;

        // TODO: implementar opção do usuario colocar foto;
        let foto = 'upload_foto.jpg'
        
        const armarioSelected = dados.armario;
        const gavetaSelected = dados.gaveta;
        const compartimentoSelected = dados.compartimento;
        const condicao = dados.send

        if ((armarioSelected==undefined || gavetaSelected==undefined || compartimentoSelected==undefined) || !condicao) {
            console.log('a');
            console.log(dados.subtipo);
            res.render('cadastro', {tipos, subtipos, armarios, gavetas, compartimentos, ferramentas,
                SelectedTipo: dados.tipo, SelectedSubtipo:dados.subtipo, SelectedArmario:dados.armario, SelectedGaveta:dados.gaveta,SelectedCompartimento:dados.compartimento,
                SelectedIdentificacao: dados.identificacao,SelectedObs: dados.obs,SelectedStatus: dados.status, condicao:false
            });
        }
        else{
            console.log('b');
            console.log(condicao);
            // await ferramenta.create({
            //     IDENTIFICACAO: dados.identificacao,
            //     DESCRICAO: dados.descricao,
            //     IDTipo: dados.tipo,
            //     IDSubstipo: dados.subtipo,
            //     IDCompartimento: dados.compartimento,
            //     IDGaveta: dados.gaveta,
            //     IDArmario: dados.armario
    
            // });
    
            res.redirect('/');
        }
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

    async cadastragaveta(req, res) {
        const dados = req.body;


        const gavetinha = await gaveta.create({
            IDENTIFICACAO: dados.identificacao,
            CONTEUDO: dados.conteudo,
            IDArmario: dados.armario

        });

        for (let i = 0; i < dados.qtdcompartimentos; i++) {
            await compartimento.create({
                IDENTIFICACAO: i+1,
                IDGaveta: gavetinha.IDGaveta
            });

        }

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
