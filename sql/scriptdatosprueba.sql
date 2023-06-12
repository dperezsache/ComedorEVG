INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`, `fechaFirmaMandato`, `referenciaUnicaMandato`) VALUES ('Padre', 'Prueba', 'email1@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '609040501', '82307805R', 'ES9420805801101234567891', 'Padre', NULL, NULL);
INSERT INTO `Padre` (`id`) VALUES (1);

INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`, `fechaFirmaMandato`, `referenciaUnicaMandato`) VALUES ('Madre', 'Prueba', 'email2@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '601044401', '98303205F', 'ES9420805801101234567891', 'Madre', NULL, NULL);
INSERT INTO `Padre` (`id`) VALUES (2);

INSERT INTO `Persona` (`nombre`, `apellidos`, `correo`, `clave`, `telefono`, `dni`, `iban`, `titular`, `fechaFirmaMandato`, `referenciaUnicaMandato`) VALUES ('Padre', 'Login', 'padre@gmail.com', '$2y$15$.LtfOiAtM44kRXnPP3AbQODd00CdEWL0/dwcZwmj890ebBFXo0LG6', '605678411', '76143305G', 'ES9420805801101234567891', 'Padre', NULL, NULL);
INSERT INTO `Padre` (`id`) VALUES (3);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Bart', 'Simpson');
INSERT INTO `Hijo` (`id`, `idPadreAlta`, `idCurso`, `pin`) VALUES (4, 2, 5, '87654321');
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (2, 4);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Lisa', 'Simpson');
INSERT INTO `Hijo` (`id`, `idPadreAlta`, `idCurso`, `pin`) VALUES (5, 1, 8, '11223344');
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (1, 5);

INSERT INTO `Persona` (`nombre`, `apellidos`) VALUES ('Maggie', 'Simpson');
INSERT INTO `Hijo` (`id`, `idPadreAlta`, `idCurso`, `pin`) VALUES (6, 2, 11, '10203040');
INSERT INTO `Hijo_Padre` (`idPadre`, `idHijo`) VALUES (2, 6);