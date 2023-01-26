// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');
const armario = require('./armario');

// Criando a tabela Gavetas
const gaveta = database.define('Gavetas', {
    IDGaveta: {
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
        type: Sequelize.STRING(30),
        allowNull: true
    },

});
// Exportando essa tabela
module.exports = gaveta;

gaveta.belongsTo(armario, {
    constraint: true,
    foreignKey: 'IDArmario'
});