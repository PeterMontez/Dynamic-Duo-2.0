// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const tipo = require('./tipo');

// Criando a tabela Subtipos
const subtipo = database.define('Subtipos', {
    IDSubtipo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    IDENTIFICACAO: {
        type: Sequelize.STRING(30),
        allowNull: false
    },

});

// Exportando essa tabela
module.exports = subtipo;

subtipo.belongsTo(tipo, {
    constraint: true,
    foreignKey: 'IDTipo'
});