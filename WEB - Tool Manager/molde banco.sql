--CREATE DATABASE ToolManager

--USE ToolManager

DROP TABLE Ferramentas
DROP TABLE Subtipos
DROP TABLE Tipos_de_ferramentas
DROP TABLE Compartimentos
DROP TABLE Gavetas
DROP TABLE Armarios
DROP TABLE Colaboradores

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
('Broca', getdate(), getdate()),
('Fresa', getdate(), getdate()),
('Escareador', getdate(), getdate()),
('Chanfrador', getdate(), getdate()),
('Rebaixador', getdate(), getdate()),
('Alargador', getdate(), getdate()),
('Barra de Usinagem', getdate(), getdate()),
('Cabeçote', getdate(), getdate()),
('Ponta', getdate(), getdate()),
('Cossinete', getdate(), getdate()),
('Macho', getdate(), getdate()),
('Pastilha', getdate(), getdate());

INSERT Subtipos VALUES
('Brocas de Centro', getdate(), getdate(), 1),
('Brocas de Aço Rápido', getdate(), getdate(), 1),
('Brocas de Metal Duro', getdate(), getdate(), 1),
('Fresa Topo Aço Rápido', getdate(), getdate(), 2),
('Fresa Topo Metal Duro', getdate(), getdate(), 2),
('Fresa Esférica', getdate(), getdate(), 2),
('Alargador Aço Rápido', getdate(), getdate(), 6),
('Alargador Metal Duro', getdate(), getdate(), 6),
('Pastilhas Cabeçote',  getdate(), getdate(),12),
('Pastilhas Torno C',  getdate(), getdate(),12),
('Pastilhas Torno D',  getdate(), getdate(),12),
('Pastilhas Torno V',  getdate(), getdate(),12),
('Pastilhas Torno W',  getdate(), getdate(),12),
('Pastilhas Torno S',  getdate(), getdate(),12),
('Pastilhas Torno P',  getdate(), getdate(),12),
('Pastilhas Torno Rosca',  getdate(), getdate(),12),
('Pastilhas Torno Bedame',  getdate(), getdate(),12),
('Pastilhas Torno T-MAX',  getdate(), getdate(),12);

INSERT Gavetas VALUES
('A', 'Diversos', getdate(), getdate(), 1),
('B', 'Limas', getdate(), getdate(), 1),
('C', 'Ferramentas Novas', getdate(), getdate(), 1),
('D', 'Chaves Torx', getdate(), getdate(), 1),
('E', 'Calços e Parafusos', getdate(), getdate(), 1),
('F', 'Barra de Tornear', getdate(), getdate(), 1),
('G', 'Brocas Intercambiáveis', getdate(), getdate(), 1),
('H', 'Pastilha D', getdate(), getdate(), 1),
('I', 'Pastilha de Rosca', getdate(), getdate(), 1),
('J', '', getdate(), getdate(), 1),
('K', 'Barra de Tornear', getdate(), getdate(), 1),
('L', 'Pastilha W', getdate(), getdate(), 1),
('M', 'Pastilha para T-MAX', getdate(), getdate(), 1),
('N', 'Suportes Capto', getdate(), getdate(), 1),
('O', '', getdate(), getdate(), 1),

insert Colaboradores values (92900546, 'NYCOLLAS WENNDY SOBOLEVSKI', 506481, 1, GETDATE(),GETDATE())


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