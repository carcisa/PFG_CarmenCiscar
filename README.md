
# Planazo

#### Curso Escolar 2023-2024
#### Autor: Carmen ciscar arroyo ([Url de Github](https://github.com/carcisa))
#### Tutor: Mónica María Marcos Gutiérrez ([Url de gitHub](https://github.com/monicamg12))
#### Fecha de Inicio: 18-03-2024
#### Fecha de Finalización: DD-MM-YYYY

## Breve descripción del proyecto

Planazo surge de la necesidad que tenemos al quedar con los amigos y no saber a 
dónde ir, ni que hacer, ya sea por no conocer la zona, por querer hacer algo 
diferente, o porque no hay manera de ponerse de acuerdo, o cuando viajamos en 
pareja, siempre tenemos que pasar mucho rato en internet buscando, que sería 
mejor ver, o donde comer.
Con mis amigos o mi pareja esta es una realidad del día a día, a eso podemos 
añadirle que soy una persona realmente indecisa.
Me he llegado a pasar horas en Google intentando buscar sitios y mirando 
reseñas, por no decidirme, o no encontrar suficiente información, por lo que al 
crear planazo podría cubrir esa necesidad que tengo en mi día y día, no tener que 
pensar tanto a la hora de decidir dónde vamos o que hacemos este sábado, solo 
tendría que limitarme a escoger una de las opciones que me ofrecería.
Sin duda me facilitaría la vida a mí, y a mucha gente que habrá por el mundo como 
yo.


## Definir el objetivo de la aplicación
Planazo es una app, que crea planes de ocio por destino.
Esta será su función principal:
La idea es que, al darle un destino, por ejemplo: Sevilla, la aplicación web, te ofrezca 
automáticamente varios planes, de forma aleatoria, compuestos por 3 o 4 actividades,
(también aleatorias entre las existentes en la base de datos), que se pueden llevar a cabo 
en ese destino, cada actividad deberá pertenecer a una categoría diferente, como 
ilustración: cena, ocio y espectáculo.
Veamos algunos ejemplos:
Destino: “Sevilla”:
1. Cena en Casa Paco
2. Paseo por el rio hasta el puente del alamillo
3. Copa en pub Victoria
-----------------------------------------→
1. Alquiler de bicicletas en Sevilla centro
pág. 5
PLANAZO
2. Cena en Japones Hirohito
3. Espectáculo en Salomon´s Dance
-----------------------------------------→
1. Tapeo en Terraza Filigrana
2. Película en Cines Yelmo
3. Tomar un helado en SweetIce
------------------------------------------→
Pero Planazo es mucho más, porque, aunque esta es su función principal, se le podrán
añadir muchísimas funciones más, por ejemplo:
- Filtrado por categoría
- Filtrado por distancia desde un punto
- Filtrado por actividades pet friendly
- Mapas para seguir las rutas y conexión con Google maps
- Comentarios
- Puntuación de usuarios
- Realizar sus propios planes personalizados
- Etc.
Incluso con tiempo, podría ser escalada a nivel de red social.


# Estructura del Proyecto Planazo

El proyecto Planazo está diseñado para facilitar la organización y el desarrollo eficiente, utilizando tecnologías modernas como Spring Boot para el backend y Angular para el frontend. A continuación, se describe la estructura de directorios del repositorio:

## src-api
Esta carpeta contiene todo el código fuente relacionado con el backend de la aplicación, desarrollado con Spring Boot. Aquí es donde se desarrollan los microservicios, modelos, controladores, y todo lo relacionado con la lógica de negocio, conexión a la base de datos, autenticación, y manejo de peticiones y respuestas de la API. La organización interna puede incluir subcarpetas como:
- controllers: Para los controladores que manejan las peticiones HTTP.
- models: Para los modelos de datos.
- services: Para la lógica de negocio.
- repositories: Para la comunicación con la base de datos.

## src-angular
En esta carpeta se encuentra el código fuente del frontend de la aplicación, desarrollado con Angular. Se incluyen componentes de la interfaz de usuario, servicios para la comunicación con el backend, módulos y directivas.


## docs
La carpeta docs está dedicada a la documentación del proyecto. Aquí se incluyen guías de instalación, configuración, uso de la API, documentación del código, y cualquier otra documentación técnica necesaria. 

## README.md
El archivo README.md proporciona una visión general del proyecto Planazo. Incluye información sobre qué es Planazo, para qué sirve, cómo instalarlo, configurarlo y ejecutarlo. 





