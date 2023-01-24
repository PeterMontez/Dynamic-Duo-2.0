// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Armario
const armario = database.define('Armario', {
    ID: {
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

    NUMERO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

});

// Exportando essa tabela
module.exports = armario;