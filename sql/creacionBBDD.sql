CREATE DATABASE Comedor;
USE Comedor;

CREATE TABLE Usuarios(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,

    CONSTRAINT PK_Usuario PRIMARY KEY (id)
);

CREATE TABLE Hijos(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    curso VARCHAR(10) NOT NULL,

    CONSTRAINT PK_idHijo PRIMARY KEY (id),
    CONSTRAINT FK_Usuarios_idHijo FOREIGN KEY (id) REFERENCES Usuarios(id)
);

CREATE TABLE Padres(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NOT NULL,
    contrasenia VARCHAR(90) NOT NULL,
    telefono CHAR(9) NOT NULL,
    dni CHAR(9) NOT NULL,
    iban CHAR(24) NOT NULL,
    titular VARCHAR(120) NOT NULL,

    CONSTRAINT PK_idPadre PRIMARY KEY(id),
    CONSTRAINT FK_Usuarios_idPadre FOREIGN KEY (id) REFERENCES Usuarios(id),
    CONSTRAINT UQ_dniPadre UNIQUE(dni),
    CONSTRAINT UQ_ibanPadre UNIQUE(iban)
);

CREATE TABLE Dias(
    idHijo SMALLINT UNSIGNED NOT NULL,
    dia DATE NOT NULL,
    
    CONSTRAINT PK_DiasIdHijo PRIMARY KEY (idHijo, dia),
    CONSTRAINT FK_idDiaHijo FOREIGN KEY (idHijo) REFERENCES Hijos(id)
);

CREATE TABLE PadreHijos(
    idPadre SMALLINT UNSIGNED NOT NULL,
    idHijo SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_PadresHijos PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_idPadre2 FOREIGN KEY (idPadre) REFERENCES Padres(id),
    CONSTRAINT FK_idHijo2 FOREIGN KEY (idHijo) REFERENCES Hijos(id)
);

CREATE TABLE Personal(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NOT NULL,
    contrasenia VARCHAR(90) NOT NULL,
    telefono CHAR(9) NOT NULL,
    dni CHAR(9) NOT NULL,
    iban CHAR(24) NOT NULL,
    titular VARCHAR(120) NOT NULL,

    CONSTRAINT PK_idPersonal PRIMARY KEY(id),
    CONSTRAINT FK_Usuarios_idPersonal FOREIGN KEY (id) REFERENCES (id),
    CONSTRAINT UQ_dniPadre UNIQUE(dni),
    CONSTRAINT UQ_ibanPadre UNIQUE(dni)
);

CREATE TABLE Pas(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NOT NULL,
    contrasenia VARCHAR(90) NOT NULL,
    telefono CHAR(9) NOT NULL,
    dni CHAR(9) NOT NULL,
    iban CHAR(24) NOT NULL,
    titular VARCHAR(120) NOT NULL,

    CONSTRAINT PK_idPas PRIMARY KEY(id),
    CONSTRAINT FK_Personal_idPas FOREIGN KEY (id) REFERENCES Personal(id),
    CONSTRAINT UQ_dniPas UNIQUE(dni),
    CONSTRAINT UQ_ibanPas UNIQUE(iban) 
);

CREATE TABLE Estudiante(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NOT NULL,
    contrasenia VARCHAR(90) NOT NULL,
    telefono CHAR(9) NOT NULL,
    dni CHAR(9) NOT NULL,
    iban CHAR(24) NOT NULL,
    titular VARCHAR(120) NOT NULL,

    CONSTRAINT PK_idEstudiante PRIMARY KEY(id),
    CONSTRAINT FK_Personal_idEstudiante FOREIGN KEY (id) REFERENCES Personal(id),
    CONSTRAINT UQ_dniEstudiante UNIQUE(dni),
    CONSTRAINT UQ_ibanEstudiante UNIQUE(iban) 
);

CREATE TABLE Profesor(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NOT NULL,
    contrasenia VARCHAR(90) NOT NULL,
    telefono CHAR(9) NOT NULL,
    dni CHAR(9) NOT NULL,
    iban CHAR(24) NOT NULL,
    titular VARCHAR(120) NOT NULL,

    CONSTRAINT PK_idProfesor PRIMARY KEY(id),
    CONSTRAINT FK_Personal_idProfesor FOREIGN KEY (id) REFERENCES Personal(id),
    CONSTRAINT UQ_dniProfesor UNIQUE(dni),
    CONSTRAINT UQ_ibanProfesor UNIQUE(iban) 
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