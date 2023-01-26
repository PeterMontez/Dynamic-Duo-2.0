// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Armario
const armario = database.define('Armario', {
    IDArmario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    TIPO: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    DIVISOES: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    IDENTIFICACAO: {
        type: Sequelize.STRING(3),
        allowNull: false
    },

});

// Exportando essa tabela
module.exports = armario;