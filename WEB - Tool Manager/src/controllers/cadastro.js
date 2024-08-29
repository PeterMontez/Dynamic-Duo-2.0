// Importando as tabelas do DB
const ferramenta = require('../model/ferramenta');
const tipo = require('../model/tipo');
const subtipo = require('../model/subtipo');
const armario = require('../model/armario');
const gaveta = require('../model/gaveta');
const compartimento = require('../model/compartimento');
const colaborador = require('../model/colaborador');

module.exports = {

    async cadastraferramenta(req, res) {
        
        const dados = req.body;


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
        
        let cartao = dados.cartao;

        if (cartao == undefined) {
            cartao = cartaozinho;
        }
        else {
            const cartaozinho = cartao;
        }

        const pessoa = await colaborador.findAll({
            raw: true,
            attributes: ['EDV','IDENTIFICACAO','CARTAO','ADMIN'],
            where: {CARTAO: cartao}
        });

        // TODO: implementar opção do usuario colocar foto;
        let foto = 'upload_foto.jpg'
        
        const armarioSelected = dados.armario;
        const gavetaSelected = dados.gaveta;
        const compartimentoSelected = dados.compartimento;
        const condicao = dados.send

        let cartaozinho = cartao;

        if ((armarioSelected==undefined || gavetaSelected==undefined || compartimentoSelected==undefined) || !condicao) {
            res.render('cadastro', {colaboradores,cartaozinho,pessoa,tipos, subtipos, armarios, gavetas, compartimentos, ferramentas,
                SelectedTipo: dados.tipo, SelectedSubtipo:dados.subtipo, SelectedArmario:dados.armario, SelectedGaveta:dados.gaveta,SelectedCompartimento:dados.compartimento,
                SelectedIdentificacao: dados.identificacao,SelectedDescricao: dados.descricao,SelectedStatus: dados.status, condicao:false
            });
        }
        else{
            if (dados.subtipo != '') {
                await ferramenta.create({
                    IDENTIFICACAO: dados.identificacao,
                    DESCRICAO: dados.descricao,
                    EDV:'',
                    IDTipo: dados.tipo,
                    IDSubtipo: dados.subtipo,
                    IDCompartimento: dados.compartimento,
                    IDGaveta: dados.gaveta,
                    IDArmario: dados.armario,
                    STATUS: dados.status
                });
            }
            else{
                await ferramenta.create({
                    IDENTIFICACAO: dados.identificacao,
                    DESCRICAO: dados.descricao,
                    EDV:'',
                    IDTipo: dados.tipo,
                    IDCompartimento: dados.compartimento,
                    IDGaveta: dados.gaveta,
                    IDArmario: dados.armario,
                    STATUS: dados.status
                });
            }
    
            res.redirect('/ToolManager');
        }
    },

    async cadastraarmario(req, res) {
        const dados = req.body;

        await armario.create({
            TIPO: dados.tipo,
            DIVISOES: dados.divisoes,
            IDENTIFICACAO: dados.identificacao
        });

        res.redirect('/ToolManager');
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
                CONTEUDO: '',
                IDGaveta: gavetinha.IDGaveta
            });

        }

        res.redirect('/ToolManager');
    },

    async cadastratipo(req, res) {
        const dados = req.body;

        await tipo.create({
            IDENTIFICACAO: dados.identificacao

        });

        res.redirect('/ToolManager');
    },

    async cadastrasubtipo(req, res) {
        const dados = req.body;

        await subtipo.create({
            IDENTIFICACAO: dados.identificacao,
            IDTipo: dados.tipo

        });

        res.redirect('/ToolManager');
    },

    async cadastracolaborador(req, res){
        const dados = req.body;

        if (dados.selectAdmin == "true") {
           var administrador = 1; 
        } 
        else{
            var administrador = 0;
        }
        
        await colaborador.create({
            EDV: dados.edv,
            IDENTIFICACAO: dados.identificacao,
            CARTAO: dados.cartao,
            ADMIN: administrador
        });
        
        res.redirect('/ToolManager')
    }

}
