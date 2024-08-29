// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const armario = require('./armario');
const gaveta = require('./gaveta');
const compartimento = require('./compartimento');
const tipo = require('./tipo');
const subtipo = require('./subtipo');

// Criando a tabela Ferramentas
const ferramenta = database.define('Ferramentas', {
    IDFerramenta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    IDENTIFICACAO: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

    DESCRICAO: {
        type: Sequelize.STRING(50),
        allowNull: true
    },

    STATUS: {
        type: Sequelize.STRING(50),
        allowNull: true
    },

    EDV: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    

    // TODO: Implementar opção do usuario colocar foto
    // Foto:{
    //     type: Sequelize.STRING(50),
    //     allowNull: false
    // }
});

// Exportando essa tabela
module.exports = ferramenta;

ferramenta.belongsTo(tipo, {
    constraint: true,
    foreignKey: 'IDTipo'
});

ferramenta.belongsTo(subtipo, {
    constraint: true,
    foreignKey: 'IDSubtipo'
});

ferramenta.belongsTo(compartimento, {
    constraint: true,
    foreignKey: 'IDCompartimento'
});

ferramenta.belongsTo(gaveta, {
    constraint: true,
    foreignKey: 'IDGaveta'
});

ferramenta.belongsTo(armario, {
    constraint: true,
    foreignKey: 'IDArmario'
});
