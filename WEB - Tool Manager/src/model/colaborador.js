// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

const colaborador = database.define('Colaboradores', {
    EDV: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    IDENTIFICACAO: {
        type: Sequelize.STRING(125),
        allowNull: false
    },
    CARTAO:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ADMIN:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = colaborador;