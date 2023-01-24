CREATE TABLE Gavetas(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    NOME CHAR(1) NOT NULL,
    CONTEUDO VARCHAR(30) NOT NULL,
    ID_ARMARIO INT,
    FOREIGN KEY(ID_ARMARIO) REFERENCES Armarios(ID)
);

// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Gavetas
const gaveta = database.define('Gavetas', {
    ID: {
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