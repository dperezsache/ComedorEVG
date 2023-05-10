CREATE DATABASE Comedor1;
USE Comedor1;
CREATE TABLE cursos(
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT PK_idCursos PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE persona(
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(90) NULL,
    contrasenia VARCHAR(255) NULL,
    telefono CHAR(9) NULL,
    dni CHAR(9) NULL,
    iban CHAR(24) NULL,
    titular VARCHAR(120) NULL,
    idCurso TINYINT UNSIGNED NOT NULL

    CONSTRAINT PK_idPersona PRIMARY KEY (id),
    CONSTRAINT UQ_correoPersona UNIQUE (correo),
    CONSTRAINT UQ_dniPersona UNIQUE (dni),
    CONSTRAINT UQ_ibanPersona UNIQUE (iban),
    CONSTRAINT FK_Curso_id FOREIGN KEY (idCurso) REFERENCES cursos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE usuario(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Usuario_id PRIMARY KEY (id),
    CONSTRAINT FK_Usuario_id FOREIGN KEY (id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE padre(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Padre_id PRIMARY KEY (id),
    CONSTRAINT FK_Padre_id FOREIGN KEY (id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE hijo(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Hijo_id PRIMARY KEY (id),
    CONSTRAINT FK_Hijo_id FOREIGN KEY (id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE dias(
    dia DATE NOT NULL,
    idUsuario SMALLINT UNSIGNED NOT NULL,
    idPadre SMALLINT UNSIGNED NOT NULL,
    
    CONSTRAINT PK_Dias_id PRIMARY KEY (idUsuario, idPadre),
    CONSTRAINT FK_Dias_idUsuario FOREIGN KEY (idUsuario) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT FK_Dias_idPadre FOREIGN KEY (idPadre) REFERENCES padre(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE padresHijos(
    idPadre SMALLINT UNSIGNED NOT NULL,
    idHijo SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_PadresHijos_id PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_PadresHijos_idPadre FOREIGN KEY (idPadre) REFERENCES padre(id) ON DELETE CASCADE,
    CONSTRAINT FK_PadresHijos_idHijo FOREIGN KEY (idHijo) REFERENCES hijo(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE secretaria(
    id TINYINT UNSIGNED NOT NULL,
    nombre VARCHAR (80) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(90) NOT NULL,

	CONSTRAINT PK_Secretaria_id PRIMARY KEY (id),
    CONSTRAINT UQ_Secretaria_correo UNIQUE (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

CREATE TABLE festivosColegio(
    diaFestivo DATE NOT NULL,

	CONSTRAINT PK_diaFestivo PRIMARY KEY (diaFestivo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;