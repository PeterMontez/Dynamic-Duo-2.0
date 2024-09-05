// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const gaveta = require('./gaveta');

// Criando a tabela Compartimentos
const compartimento = database.define('Compartimentos', {
    IDCompartimento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    IDENTIFICACAO: {
        type: Sequelize.STRING(3),
        allowNull: false
    },

    CONTEUDO: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

});

// Exportando essa tabela
module.exports = compartimento;

compartimento.belongsTo(gaveta, {
    constraint: true,
    foreignKey: 'IDGaveta'
});