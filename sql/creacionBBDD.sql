CREATE DATABASE Comedor;
USE Comedor;

CREATE TABLE Padres(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (80) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(90) NOT NULL,
    contrasenia VARCHAR(90) NOT NULL,
    telefono CHAR(9) NOT NULL,
    dni CHAR(9) NOT NULL,
    iban CHAR(24) NOT NULL,
    titular VARCHAR(120) NOT NULL,

    CONSTRAINT PK_idPadre PRIMARY KEY(id),
    CONSTRAINT UQ_dniPadre UNIQUE(dni),
    CONSTRAINT UQ_ibanPadre UNIQUE(dni)
);

CREATE TABLE Hijos(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (80) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    curso VARCHAR(10) NOT NULL,

    CONSTRAINT PK_idHijo PRIMARY KEY (id)
    
);

CREATE TABLE Dias(

    idHijo SMALLINT UNSIGNED NOT NULL,
    dia DATE NOT NULL,
    
    CONSTRAINT PK_DiasIdHijo PRIMARY KEY (idHijo, dia),
    CONSTRAINT FK_idHijo FOREIGN KEY (idHijo) REFERENCES Hijos(id)
);
CREATE TABLE PadreHijos(
    idPadre SMALLINT UNSIGNED NOT NULL,
    idHijo SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_PadresHijos PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_idPadre2 FOREIGN KEY (idPadre) REFERENCES Padres(id),
    CONSTRAINT FK_idHijo2 FOREIGN KEY (idHijo) REFERENCES Hijos(id)
);

CREATE TABLE Secretaria(
    id TINYINT UNSIGNED NOT NULL,
    nombre VARCHAR (80) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(90) NOT NULL unique,
    contrasenia VARCHAR(90) NOT NULL,
	CONSTRAINT PK_Secretaria PRIMARY KEY (id)
);

CREATE TABLE festivosColegio(
    diaFestivo DATE NOT NULL,
	CONSTRAINT PK_diaFestivo PRIMARY KEY (diaFestivo)
);