INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`)
VALUES ('David', 'Pérez', 'david@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '609040501', '82307805R', 'ES9420805801101234567891', 'David');

INSERT INTO `Padre` (`id`) 
VALUES (1);

INSERT INTO `Persona` (`nombre`, `apellidos`)
VALUES ('Patricio', 'Estrella');

INSERT INTO `Hijo` (`id`, `idCurso`)
VALUES (2, 5);

INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`)
VALUES (1, 2);