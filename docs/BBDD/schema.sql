actividad

CREATE TABLE IF NOT EXISTS USUARIO (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS DESTINO (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Imagen VARCHAR(2048) --  almacena URLs de imagen
);



CREATE TABLE IF NOT EXISTS ACTIVIDAD (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Categoria ENUM('OCIO', 'NATURALEZA', 'DEPORTE', 'GASTRONOMÍA', 'CULTURA') NOT NULL,
    Puntuacion DECIMAL(2,1),
    Direcciocomentarion VARCHAR(255),
    Horario VARCHAR(255),
    Imagen VARCHAR(2048), -- Ajustado para almacenar URLs de imagen
    Destino_id INT,
    CONSTRAINT fk_destino
        FOREIGN KEY (Destino_id) 
        REFERENCES DESTINO(ID)
        ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS COMENTARIO (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Puntuacion DECIMAL(2,1),
    Usuario_id INT NOT NULL,
    Actividad_id INT NOT NULL,
    CONSTRAINT fk_usuario_comentariousuario
        FOREIGN KEY (Usuario_id) 
        REFERENCES USUARIO(ID)
        ON DELETE CASCADE,
    CONSTRAINT fk_actividad
        FOREIGN KEY (Actividad_id) 
        REFERENCES ACTIVIDAD(ID)
        ON DELETE CASCADE
);
