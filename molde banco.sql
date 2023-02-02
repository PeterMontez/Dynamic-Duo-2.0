--CREATE DATABASE ARMARIOSTESTE

--USE ARMARIOSTESTE

DROP TABLE Ferramentas
DROP TABLE Subtipos
DROP TABLE Tipos_de_ferramentas
DROP TABLE Compartimentos
DROP TABLE Gavetas
DROP TABLE Armarios

CREATE TABLE Armarios(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TIPO VARCHAR(10) NOT NULL,  -- GAVETAS OU PORTAS
    DIVISOES INT NOT NULL,
    NUMERO INT NOT NULL,
);
CREATE TABLE Gavetas(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NOME CHAR(1) NOT NULL,
    CONTEUDO VARCHAR(30) NOT NULL,
    ID_ARMARIO INT,
    FOREIGN KEY (ID_ARMARIO) REFERENCES Armarios(ID)
);
CREATE TABLE Compartimentos(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NUMERO int,
    ID_GAVETA INT,
    FOREIGN KEY (ID_GAVETA) REFERENCES Gavetas(ID)
);
CREATE TABLE Tipos_de_ferramentas(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NOME VARCHAR(30)
);
CREATE TABLE Subtipos(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NOME VARCHAR(30),
	ID_TIPO INT,
	FOREIGN KEY (ID_TIPO) REFERENCES Tipos_de_ferramentas(ID)
);
CREATE TABLE Ferramentas(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    OBS VARCHAR(70) NOT NULL,
    STATUS VARCHAR(30) NOT NULL,
    ID_TIPO INT NOT NULL,
	ID_SUBTIPO INT NOT NULL,
    ID_COMPARTIMENTO INT NOT NULL,
    ID_GAVETA INT NOT NULL,
    ID_ARMARIO INT NOT NULL,
    FOREIGN KEY (ID_TIPO) REFERENCES Tipos_de_ferramentas(ID),
	FOREIGN KEY (ID_SUBTIPO) REFERENCES Subtipos(ID),
    FOREIGN KEY (ID_COMPARTIMENTO) REFERENCES Compartimentos(ID),
    FOREIGN KEY (ID_GAVETA) REFERENCES Gavetas(ID),
    FOREIGN KEY (ID_ARMARIO) REFERENCES Armarios(ID),
);

INSERT Tipos_de_ferramentas VALUES
('Broca'),
('Fresa'),
('Escareador'),
('Chanfrador'),
('Rebaixador'),
('Alargador'),
('Barra de Usinagem'),
('Cabe�ote'),
('Ponta'),
('Cossinete'),
('Macho'),
('Pastilha');

INSERT Subtipos VALUES
('Brocas de Centro', 1),
('Brocas de A�o R�pido', 1),
('Brocas de Metal Duro', 1),
('Fresa Topo A�o R�pido', 2),
('Fresa Topo Metal Duro', 2),
('Fresa Esf�rica', 2),
('Alargador A�o R�pido', 6),
('Alargador Metal Duro', 6),
('Pastilhas Cabe�ote', 12),
('Pastilhas Torno C', 12),
('Pastilhas Torno D', 12),
('Pastilhas Torno V', 12),
('Pastilhas Torno W', 12),
('Pastilhas Torno S', 12),
('Pastilhas Torno P', 12),
('Pastilhas Torno Rosca', 12),
('Pastilhas Torno Bedame', 12),
('Pastilhas Torno T-MAX', 12);

delete from Ferramentas where (IDENTIFICACAO='')
SELECT * FROM Armarios
SELECT * FROM Gavetas
SELECT * FROM Compartimentos
SELECT * FROM Tipos_de_ferramentas
SELECT * FROM Subtipos
SELECT * FROM Ferramentas
SELECT * FROM Colaboradores

update Colaboradores set IDENTIFICACAO = 'DONATHAN RAMALHO' where edv = 92896232

select * from  ferramentas where IDENTIFICACAO = 'pedrinha'