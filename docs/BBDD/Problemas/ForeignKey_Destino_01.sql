SELECT *
FROM actividad
WHERE Destino_id NOT IN (SELECT ID FROM destino);


select * from destino;