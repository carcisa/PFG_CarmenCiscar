#Cádiz
INSERT INTO ACTIVIDAD (Nombre, Descripción, Categoría, Puntuación, Dirección, Horario, Imagen, Destino_id) VALUES
('Observación de aves en el Parque Natural de Doñana', 'Experimenta la diversidad de aves en uno de los humedales más importantes de Europa.', 'NATURALEZA', NULL, 'Parque Natural de Doñana, Cádiz', '08:00-18:00', 'URL_IMAGEN_AVES_DONANA', 2),
('Paseo por el Parque Natural de la Breña y Marismas del Barbate', 'Disfruta de un paseo por este parque natural, que ofrece unas vistas espectaculares de la costa y de la sierra.', 'NATURALEZA', NULL, 'Parque Natural de la Breña, Cádiz', 'Todo el día', 'URL_IMAGEN_BRENA_BARBATE', 2),
('Visita a la Catedral de Cádiz', 'Descubre la historia y la arquitectura de la impresionante Catedral de Cádiz.', 'CULTURA', NULL, 'Catedral de Cádiz, Cádiz', '10:00-18:00', 'URL_IMAGEN_CATEDRAL_CADIZ', 2),
('Recorrido por el Teatro Romano de Cádiz', 'Explora uno de los teatros romanos más antiguos descubiertos en España.', 'CULTURA', NULL, 'Teatro Romano de Cádiz, Cádiz', '09:00-19:00', 'URL_IMAGEN_TEATRO_ROMANO', 2),
('Ruta del atún rojo en Barbate', 'Saborea el atún rojo en diferentes preparaciones, una especialidad local de Barbate.', 'GASTRONOMÍA', NULL, 'Barbate, Cádiz', '12:00-16:00, 19:00-23:00', 'URL_IMAGEN_ATUN_ROJO', 2),
('Degustación de vinos de Jerez', 'Descubre los secretos de los vinos de Jerez con una visita a una bodega local.', 'GASTRONOMÍA', NULL, 'Jerez de la Frontera, Cádiz', '11:00-14:00, 17:00-19:00', 'URL_IMAGEN_VINOS_JEREZ', 2),
('Surf en la playa de Tarifa', 'Atrévete a surfear en las playas de Tarifa, conocidas mundialmente por sus excelentes condiciones para el windsurf y el kitesurf.', 'DEPORTE', NULL, 'Playa de Tarifa, Cádiz', 'Todo el día', 'URL_IMAGEN_SURF_TARIFA', 2),
('Rutas a caballo en la Sierra de Grazalema', 'Disfruta de una ruta a caballo por los paisajes únicos de la Sierra de Grazalema.', 'DEPORTE', NULL, 'Sierra de Grazalema, Cádiz', '09:00-14:00', 'URL_IMAGEN_CABALLO_GRAZALEMA', 2),
('Espectáculo ecuestre en la Real Escuela Andaluza del Arte Ecuestre', 'Maravíllate con un espectáculo de danza ecuestre que muestra la tradición y habilidad de la equitación andaluza.', 'OCIO', NULL, 'Real Escuela Andaluza del Arte Ecuestre, Jerez de la Frontera, Cádiz', '12:00-14:00', 'URL_IMAGEN_ESPECTACULO_EQUESTRE',2),
('Carnaval de Cádiz', 'Sumérgete en el ambiente festivo del Carnaval de Cádiz, uno de los más famosos y divertidos de España.', 'OCIO', NULL, 'Calles de Cádiz, Cádiz', 'Variable, principalmente en febrero', 'URL_IMAGEN_CARNAVAL_CADIZ', 2);

select * from actividad;