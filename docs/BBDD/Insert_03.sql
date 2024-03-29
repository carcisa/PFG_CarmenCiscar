
#Almería
INSERT INTO ACTIVIDAD (Nombre, Descripción, Categoría, Puntuación, Dirección, Horario, Imagen, Destino_id) VALUES
('Visita al Parque Natural Cabo de Gata-Níjar', 'Explora la belleza natural del Cabo de Gata, sus playas y paisajes volcánicos.', 'NATURALEZA', NULL, 'Cabo de Gata, Almería', 'Todo el día', 'URL_IMAGEN_CABO_GATA', 1),
('Tour por el Conjunto Monumental de la Alcazaba', 'Descubre la historia de Almería a través de su impresionante fortaleza musulmana.', 'CULTURA', NULL, 'Alcazaba, Almería', '09:00-18:00', 'URL_IMAGEN_ALCAZABA', 1),
('Degustación de tapas en la capital', 'Saborea las mejores tapas almerienses en un tour gastronómico por la ciudad.', 'GASTRONOMÍA', NULL, 'Centro de Almería', '12:00-16:00, 20:00-24:00', 'URL_IMAGEN_TAPAS_ALMERIA', 1),
('Rutas de senderismo en Sierra de los Filabres', 'Disfruta de la naturaleza y el ejercicio con rutas de senderismo por la Sierra de los Filabres.', 'DEPORTE', NULL, 'Sierra de los Filabres, Almería', 'Todo el día', 'URL_IMAGEN_SIERRA_FILABRES', 1),
('Noche de flamenco en un tablao local', 'Vive la pasión del flamenco en una auténtica noche almeriense.', 'OCIO', NULL, 'Tablao en Almería', '21:00-23:00', 'URL_IMAGEN_FLAMENCO_ALMERIA', 1);



INSERT INTO ACTIVIDAD (Nombre, Descripción, Categoría, Puntuación, Dirección, Horario, Imagen, Destino_id) VALUES
('Kayak en las calas de Cabo de Gata', 'Recorre en kayak algunas de las calas más hermosas y accesibles solo por mar del Parque Natural Cabo de Gata-Níjar.', 'NATURALEZA', NULL, 'Parque Natural Cabo de Gata, Almería', '10:00-14:00', 'URL_IMAGEN_KAYAK_CABO_GATA', 1),
('Visita al Museo de Almería', 'Explora la rica historia de Almería desde la prehistoria hasta la época moderna en su museo provincial.', 'CULTURA', NULL, 'Museo de Almería, Almería', '09:00-20:00', 'URL_IMAGEN_MUSEO_ALMERIA', 1),
('Ruta de vinos por la Alpujarra Almeriense', 'Disfruta de una jornada de enoturismo descubriendo los vinos de la Alpujarra Almeriense.', 'GASTRONOMÍA', NULL, 'Alpujarra de Almería, Almería', '11:00-16:00', 'URL_IMAGEN_VINOS_ALPUJARRA', 1),
('Buceo en el arrecife de las Sirenas', 'Sumérgete en las aguas cristalinas del Cabo de Gata y explora el famoso arrecife de las Sirenas.', 'DEPORTE', NULL, 'Arrecife de las Sirenas, Cabo de Gata, Almería', '09:00-17:00', 'URL_IMAGEN_BUCEO_SIRENAS', 1),
('Cine al aire libre en la playa de los Genoveses', 'Disfruta de una noche de cine bajo las estrellas en una de las playas más emblemáticas de Almería.', 'OCIO', NULL, 'Playa de los Genoveses, Cabo de Gata, Almería', '21:00-23:00', 'URL_IMAGEN_CINE_PLAYA_GENOVESES', 1);

select * from actividad;