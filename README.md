# Tecnoturis

Dentro del repositorio hay dos carpetas:
- Tenoturis-api (back)
- Tecnoturis-app (front)

Para poder ejecutarlo hay que seguir los siguientes pasos:

1- Entrar en cada carpeta por el terminal y ejecutar *npm install*.

2- Crear en el "back" el archivo .env con las siguiente variables:
  - PORT=3001
  - MONGO_DB_URI=****** (entorno de producción de mongoDB)
  - MONGO_DB_URI_TEST=****** (entorno de pruebas de mongoDB)
  - SECRET=***** (secreto para la codificación/decodificación de las constraseñas de usuario)
  - USERHOTEL=*** (usuario para acceder a la API de Tecnoturis)
  - PASSHOTEL=*** (contraseña para acceder a la API de Tecnoturis
  
3- Ejecutar desde la carpeta de back en el terminal *nodemon*

4- Ejecutar desde la carpeta de fron en el terminal npm start

La app dispone de las siguientes funcionalidades:
- Creación de usuario
- Login de usuario
- Una vez logueado muestra la lista completa de hoteles
- Seleccionando un hotel muestra más información del mismo
- Se puede filtrar por ID del hotel
- Se puede filtrar rating del hotel
- Si se borran los filtros vuelve a poner el listado completo de hoteles
