## Aquí irá el feedback del ejercicio
Holaa excelente trabajo!
Agregamos dos cambios, el primero relacionado con un error de `process.permission` que no existe en Node.js, por lo que usamos `process.permission?.has()` para evitarlo.

Y un segundo cambio, el cual es capturar el error cuando el directorio no existe y avisarle al usuario.

Un saludo y a seguir trabajando!