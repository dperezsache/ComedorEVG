INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`, `fechaFirmaMandato`, `referenciaUnicaMandato`) VALUES ('David', 'Pérez', 'email@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '609040501', '82307805R', 'ES9420805801101234567891', 'David', NULL, NULL);
INSERT INTO `Padre` (`id`) VALUES (1);

INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`, `fechaFirmaMandato`, `referenciaUnicaMandato`) VALUES ('Manola', 'Pirola', 'email2@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '601044401', '98303205F', 'ES9420805801101234567891', 'Manola', NULL, NULL);
INSERT INTO `Padre` (`id`) VALUES (2);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Bob', 'Esponja');
INSERT INTO `Hijo` (`id`, `idPadreAlta`, `idCurso`, `pin`) VALUES (3, 2, 5, '87654321');
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (2, 3);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Patricio', 'Estrella');
INSERT INTO `Hijo` (`id`, `idPadreAlta`, `idCurso`, `pin`) VALUES (4, 1, 8, '11223344');
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (1, 4);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Calamardo', 'Tentáculos');
INSERT INTO `Hijo` (`id`, `idPadreAlta`, `idCurso`, `pin`) VALUES (5, 2, 11, '10203040');
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (2, 5);