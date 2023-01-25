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

    NOME: {
        type: Sequelize.STRING(1),
        allowNull: false
    },

    CONTEUDO: {
        type: Sequelize.STRING(30),
        allowNull: false
    },

    ID_ARMARIO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

});
// Exportando essa tabela
module.exports = gaveta;

aluno.belongsTo(armario, {
    constraint: true,
    foreignKey: 'IDArmario'
});