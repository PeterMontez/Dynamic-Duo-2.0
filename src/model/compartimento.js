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

    NUMERO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

});

// Exportando essa tabela
module.exports = compartimento;

compartimento.belongsTo(gaveta, {
    constraint: true,
    foreignKey: 'IDGaveta'
});