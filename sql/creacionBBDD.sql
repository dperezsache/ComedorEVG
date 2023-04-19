CREATE DATABASE Comedor;
USE Comedor;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Hijo(
    id SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_Hijo_id PRIMARY KEY (id),
    CONSTRAINT FK_Hijo_id FOREIGN KEY (id) REFERENCES Persona(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Dias(
    idHijo SMALLINT UNSIGNED NOT NULL,
    dia DATE NOT NULL,
    
    CONSTRAINT PK_Dias_id PRIMARY KEY (idHijo, dia),
    CONSTRAINT FK_Dias_idHijo FOREIGN KEY (idHijo) REFERENCES Hijo(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE PadresHijos(
    idPadre SMALLINT UNSIGNED NOT NULL,
    idHijo SMALLINT UNSIGNED NOT NULL,

    CONSTRAINT PK_PadresHijos_id PRIMARY KEY (idPadre, idHijo),
    CONSTRAINT FK_PadresHijos_idPadre FOREIGN KEY (idPadre) REFERENCES Persona(id),
    CONSTRAINT FK_PadresHijos_idHijo FOREIGN KEY (idHijo) REFERENCES Hijo(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Secretaria(
    id TINYINT UNSIGNED NOT NULL,
    nombre VARCHAR (80) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(90) NOT NULL,

	CONSTRAINT PK_Secretaria_id PRIMARY KEY (id),
    CONSTRAINT UQ_Secretaria_correo UNIQUE (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE festivosColegio(
    diaFestivo DATE NOT NULL,

	CONSTRAINT PK_diaFestivo PRIMARY KEY (diaFestivo)
);