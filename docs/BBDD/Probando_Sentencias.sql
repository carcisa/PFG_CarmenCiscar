DELETE FROM ACTIVIDAD WHERE Destino_id = 5;
DELETE FROM ACTIVIDAD WHERE Destino_id = 8;

select * from usuario;

select * from actividad;
select * from actividad where Destino_id = 3;

ALTER TABLE ACTIVIDAD
MODIFY COLUMN Puntuación TINYINT CHECK (Puntuación BETWEEN 1 AND 5);

ALTER TABLE ACTIVIDAD
MODIFY COLUMN Puntuación DECIMAL(3,1) CHECK (Puntuación BETWEEN 1.0 AND 5.0);

INSERT INTO `planazo`.`actividad` (`Puntuación`) VALUES (2.3);
INSERT INTO `planazo`.`actividad` (`Puntuación`) VALUES (4.6);

SELECT *
FROM actividad
WHERE Destino_id NOT IN (SELECT ID FROM destinos);


