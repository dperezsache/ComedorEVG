INSERT INTO `persona` (`nombre`, `apellidos`, `correo`, `contrasenia`, `telefono`, `dni`, `iban`, `titular`) 
VALUES ('sergio', 'rivera', 'sergio@gmail.com', '1234', '690112233', '80909009A', '4', 'sergio');

INSERT INTO `padre` (`id`)
VALUES (1);

INSERT INTO `persona` (`nombre`, `apellidos`, `correo`)
VALUES ('david', 'perez sache', 'dperezsache@alumnado.fundacionloyola.net');

INSERT INTO `hijo` (`id`)
VALUES (2);

INSERT INTO `padresHijos` (`idPadre`, `idHijo`)
VALUES (1, 2);