INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`) VALUES ('David', 'Pérez', 'email@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '609040501', '82307805R', 'ES9420805801101234567891', 'David');
INSERT INTO `Padre` (`id`) VALUES (1);

INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`) VALUES ('Manola', 'Pirola', 'email2@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '601044401', '98303205F', 'ES9420805801101234567891', 'Manola');
INSERT INTO `Padre` (`id`) VALUES (2);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Bob', 'Esponja');
INSERT INTO `Hijo` (`id`, `idCurso`) VALUES (3, 5);
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (1, 3);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Patricio', 'Estrella');
INSERT INTO `Hijo` (`id`, `idCurso`) VALUES (4, 8);
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (1, 4);
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (2, 4);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Calamardo', 'Tentáculos');
INSERT INTO `Hijo` (`id`, `idCurso`) VALUES (5, 11);
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (1, 5);
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (2, 5);