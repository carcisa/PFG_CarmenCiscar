INSERT INTO USUARIO (Nombre, Email, Password) VALUES
('María Jiménez', 'mariajimenez@gmail.com', 'maria1234'),
('Juan Pérez', 'juanperez@gmail.com', 'juan1234'),
('Ana López', 'analopez@gmail.com', 'ana1234'),
('Roberto García', 'robertogarcia@gmail.com', 'roberto1234'),
('Laura Martínez', 'lauramartinez@gmail.com', 'laura1234'),
('Carlos Hernández', 'carloshernandez@gmail.com', 'carlos1234'),
('Patricia González', 'patriciagonzalez@gmail.com', 'patricia1234'),
('Fernando Álvarez', 'fernandoalvarez@gmail.com', 'fernando1234'),
('Carmen Ruiz', 'carmenruiz@gmail.com', 'carmen1234'),
('Sergio Moreno', 'sergiomoreno@gmail.com', 'sergio1234');

INSERT INTO USUARIO_ROL (Usuario_id, Rol) VALUES
(1, 'ROL_ADMIN'),
(2, 'ROL_ADMIN'),
(3, 'ROL_USER'),
(4, 'ROL_USER'),
(5, 'ROL_USER'),
(6, 'ROL_USER'),
(7, 'ROL_USER'),
(8, 'ROL_USER'),
(9, 'ROL_USER'),
(10, 'ROL_USER');


select * from usuario;
select * from usuario_rol;