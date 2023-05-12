CREATE DATABASE Comedor;

CREATE TABLE Persona(
CREATE TABLE Persona(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NULL,
    contrasenia VARCHAR(255) NULL,
    telefono CHAR(9) NULL,
    dni CHAR(9) NULL,
    iban CHAR(24) NULL,
    titular VARCHAR(120) NULL,

    CONSTRAINT PK_idPersona PRIMARY KEY (id),
    CONSTRAINT UQ_correoPersona UNIQUE (correo),
    CONSTRAINT UQ_dniPersona UNIQUE (dni),
    CONSTRAINT UQ_ibanPersona UNIQUE (iban)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Curso(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,

    CONSTRAINT PK_idCurso PRIMARY KEY (id)
     
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Usuario(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Usuario_id PRIMARY KEY (id),
    CONSTRAINT FK_Usuario_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
    CONSTRAINT FK_Usuario_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Padre(
CREATE TABLE Padre(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Padre_id PRIMARY KEY (id),
    CONSTRAINT FK_Padre_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
    CONSTRAINT FK_Padre_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Hijo(
CREATE TABLE Hijo(
    id SMALLINT UNSIGNED NOT NULL,
    idCurso TINYINT UNSIGNED NOT NULL,
    idCurso TINYINT UNSIGNED NOT NULL,
    CONSTRAINT PK_Hijo_id PRIMARY KEY (id),
    CONSTRAINT FK_Curso_id FOREIGN KEY (idCurso) REFERENCES Curso(id),
    CONSTRAINT FK_Hijo_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
    CONSTRAINT FK_Curso_id FOREIGN KEY (idCurso) REFERENCES Curso(id),
    CONSTRAINT FK_Hijo_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Dias(
CREATE TABLE Dias(
    dia DATE NOT NULL,
    idUsuario SMALLINT UNSIGNED NOT NULL,
    idPadre SMALLINT UNSIGNED NOT NULL,
    
    CONSTRAINT PK_Dias_id PRIMARY KEY (idUsuario, idPadre),
    CONSTRAINT FK_Dias_idUsuario FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    CONSTRAINT FK_Dias_idPadre FOREIGN KEY (idPadre) REFERENCES Padre(id) ON DELETE CASCADE
    CONSTRAINT FK_Dias_idUsuario FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    CONSTRAINT FK_Dias_idPadre FOREIGN KEY (idPadre) REFERENCES Padre(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Hijo_Padre(
CREATE TABLE Hijo_Padre(
    idPadre SMALLINT UNSIGNED NOT NULL,
    idHijo SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Hijo_Padre_id PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_Hijo_Padre_idPadre FOREIGN KEY (idPadre) REFERENCES Padre(id) ON DELETE CASCADE,
    CONSTRAINT FK_Hijo_Padre_idHijo FOREIGN KEY (idHijo) REFERENCES Hijo(id) ON DELETE CASCADE
    CONSTRAINT PK_Hijo_Padre_id PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_Hijo_Padre_idPadre FOREIGN KEY (idPadre) REFERENCES Padre(id) ON DELETE CASCADE,
    CONSTRAINT FK_Hijo_Padre_idHijo FOREIGN KEY (idHijo) REFERENCES Hijo(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Secretaria(
CREATE TABLE Secretaria(
    id TINYINT UNSIGNED NOT NULL,
    nombre VARCHAR (80) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(90) NOT NULL,

	CONSTRAINT PK_Secretaria_id PRIMARY KEY (id),
    CONSTRAINT UQ_Secretaria_correo UNIQUE (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Festivo(
CREATE TABLE Festivo(
    diaFestivo DATE NOT NULL,

	CONSTRAINT PK_Festivo PRIMARY KEY (diaFestivo)
	CONSTRAINT PK_Festivo PRIMARY KEY (diaFestivo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE RecuperacionClaves(
    id SMALLINT UNSIGNED NOT NULL,
    fechaLimite DATETIME NOT NULL,
    codigo VARCHAR(16) NOT NULL,

    CONSTRAINT PK_RecuperacionClaves_id PRIMARY KEY (id),
    CONSTRAINT UQ_RecuperacionClaves_Codigo UNIQUE (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ////////////////////////////////
-- // INSERCIÓN MASIVA DE CURSOS //
-- ////////////////////////////////
INSERT INTO Curso (nombre) 
VALUES ('1º Infantil'),
        ('2º Infantil'),
        ('1º Primaria'),
        ('2º Primaria'),
        ('3º Primaria'),
        ('4º Primaria'),
        ('5º Primaria'),
        ('6º Primaria'),
        ('1º ESO'),
        ('2º ESO'),
        ('3º ESO'),
        ('4º ESO'),
        ('1º BACH'),
        ('2º BACH'),
        ('1º CFGM'),
        ('2º CFGM'),
        ('1º CFGS')