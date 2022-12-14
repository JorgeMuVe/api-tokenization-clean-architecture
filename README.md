# TOKENIZACIÓN DE TARJETAS CHALLENGE

Esta solución permite almacenar los datos de una petición de tokenización con una expiración de 15 minutos.
El proyecto expone dos apis desplegables en AWS Lambda con conexión a dynamodb.

- El primer api guarda los datos de una tarjeta devolviendo un token generado y almacenado.
- El segundo api busca una tarjeta de acuerdo al token generado.

### Patrón de arquitectura: Clean Architecture

Termino usado por Rober C. Martin para la unión de los modelos de capas más utilizados.

Esto nos permitirá separa la lógica del negocio con el repositorio de datos, de esta forma separamos las responsabilidades del código, 
eso quiere decir que, si usamos dynamoDB, mongoDB, mysql, etc. no afectara en los requerimientos del negocio.

### Patrón de diseño: Inyección de dependencias y Singleton

Inyección de dependencias para implementar Clean Architecture.
Singleton para instanciar una sola vez la conexión a Dynamodb.

## Instalación local

- Puedes instalar las dependencias con npm.
    ```bash
    npm install

- Para compilar TypeScript y generar el build ejecute el siguiente comando.
    ```bash
    npm run build

- Es necesario tener dynamoDB instalado y ejecutándose locamente, abra una nueva consola y ejecute.
    ```bash
    npm run start-dynamo-local

- Una vez dynamodb este prendido modifique la información de la tarjeta en el archivo [postToken.test](./src/infrastructure/driving-adapters/test/postToken.test.js)
y ejecute el test de la tokenización.
    ```bash
    npm run test-post

- Con el token que se mostro en consola modifique el token del pathParametersObject en el archivo [getToken.test](./src/infrastructure/driving-adapters/test/getToken.test.js)
y ejecute el test de la validación de expiración del token.
    ```bash
    npm run test-get

## Despliegue AWS

- Necesitas tener instalado serverless globalmente.
    ```bash
    npm install -g serverless

- Puedes instalar las dependencias con npm.
    ```bash
    npm install

- Puedes crear un usuario IAM en la consola de AWS,
al crear el usuario se le entregada `NOMBRE_USUARIO`, `ACCES_KEY_ID` y `SECRET_ACCES_KEY`.

- Una vez tenga las credenciales ejecute el siguiente comando.

    ```bash
    serverless config credentials \
    --provider aws \
    --key `ACCES_KEY_ID` \
    --secret `SECRET_ACCES_KEY` \
    --profile `NOMBRE_USUARIO`  

- Modifique el archivo [serverless.yml](./serverless.yml) con los datos de su AWS IAM,
`profile` con `NOMBRE_USUARIO` y `region` con la región de su servicio AWS.

- Para desplegar el proyecto necesitas ejecutar el siguiente comando.
    ```bash
    npm run deploy

## APIS

Para probar los endpoints expuestos se adjunto un proyecto de Postman.

- POST: Para tokenizar una tarjeta, devuelve un token.
- GET: Para recuperar información de una tarjeta.

Puedes importar el [archivo](API_TOKENIZATION.postman_collection.json) en [Postman](https://www.postman.com/downloads/)

## Adicionales

- Para validar las buenas practicas del código con Linter usamos Standar y puedes ejecutar con
el siguiente comando.
    ```bash
    npm run linter
- Para testear la lógica del negocio con dynamoDB puede modificar el archivo [dynamoDriving.ts](./src/infrastructure/driving-adapters/console/dynamoDriving.ts)
y ejecuate los comandos
    ```bash
    npm run build
    npm run start-console-dynamo

## Contribución

Las solicitudes de pull para mejorar el código son bienvenidas.
