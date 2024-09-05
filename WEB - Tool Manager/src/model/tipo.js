// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Tipos_de_ferramentas
const tipo = database.define('Tipos_de_ferramentas', {
    IDTipo: {
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
module.exports = tipo;