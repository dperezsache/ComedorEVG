CREATE DATABASE Comedor;

CREATE TABLE Persona(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NULL,
    clave VARCHAR(255) NULL,
    telefono CHAR(9) NULL,
    dni CHAR(9) NULL,
    iban CHAR(24) NULL,
    titular VARCHAR(120) NULL,

    CONSTRAINT PK_idPersona PRIMARY KEY (id),
    CONSTRAINT UQ_correoPersona UNIQUE (correo),
    CONSTRAINT UQ_dniPersona UNIQUE (dni)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE Padre(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Padre_id PRIMARY KEY (id),
    CONSTRAINT FK_Padre_id FOREIGN KEY (id) REFERENCES Persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Hijo(
    id SMALLINT UNSIGNED NOT NULL,
    idCurso TINYINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Hijo_id PRIMARY KEY (id),
    CONSTRAINT FK_Curso_id FOREIGN KEY (idCurso) REFERENCES Curso(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Dias(
    dia DATE NOT NULL,
    idPersona SMALLINT UNSIGNED NOT NULL,
    idPadre SMALLINT UNSIGNED NULL,
    incidencia VARCHAR(500) NULL,

    CONSTRAINT PK_Dias_id PRIMARY KEY (dia, idPersona),
    CONSTRAINT FK_Dias_idPersona FOREIGN KEY (idPersona) REFERENCES Persona(id) ON DELETE CASCADE,
	incidencia VARCHAR(500) NULL,
    idUsuario SMALLINT UNSIGNED NOT NULL,
    idPadre SMALLINT UNSIGNED NOT NULL,
    
    CONSTRAINT PK_Dias_id PRIMARY KEY (dia, idUsuario, idPadre),
    CONSTRAINT FK_Dias_idUsuario FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    CONSTRAINT FK_Dias_idPadre FOREIGN KEY (idPadre) REFERENCES Padre(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Hijo_Padre(
    idPadre SMALLINT UNSIGNED NOT NULL,
    idHijo SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Hijo_Padre_id PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_Hijo_Padre_idPadre FOREIGN KEY (idPadre) REFERENCES Padre(id) ON DELETE CASCADE,
    CONSTRAINT FK_Hijo_Padre_idHijo FOREIGN KEY (idHijo) REFERENCES Hijo(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE Festivo(
    diaFestivo DATE NOT NULL,

	CONSTRAINT PK_Festivo PRIMARY KEY (diaFestivo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE RecuperacionClaves(
    id SMALLINT UNSIGNED NOT NULL,
    fechaLimite DATETIME NOT NULL,
    codigo VARCHAR(16) NOT NULL,

    CONSTRAINT PK_RecuperacionClaves_id PRIMARY KEY (id),
    CONSTRAINT FK_RecuperacionClaves_id FOREIGN KEY (id) REFERENCES Persona(id),
    CONSTRAINT UQ_RecuperacionClaves_Codigo UNIQUE (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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