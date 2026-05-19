# Ejercicio: Listado de archivos con permisos y manejo de errores

## Objetivo

Bienvenido al primer ejercicio de Node.js!

En este ejercicio vas a crear un script que liste archivos y carpetas para que:

1. Muestre un ícono de la carpeta/archivo (📁/📄) según corresponda.
2. Muestre el nombre del archivo/carpeta.
3. Muestre el tamaño del archivo/carpeta (en caso de ser un carpeta, mostrar `-`).
4. Pueda tener restricción de permisos y un mensaje de error claro en caso de no habilitarlo. (Necesario hacer `node cli.js --permission`).
5. Poder ordenar los archivos por nombre en orden ascendente o descendente.
6. Poder filtrar archivos o carpetas.

---

## Código base

Partimos del siguiente script en `./cli.js` con las importaciones requeridas:

```js
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
```

---

## Primer ejercicio

El objetivo de este primer ejercicio es poder obtener desde `process.argv` el directorio que el usuario quiere listar.

Lo que deberás hacer es obtener el directorio, y poder obtener la info de cada archivo/carpeta.

Obteniendo:

- Nombre del archivo/carpeta
- Si es carpeta o archivo
- Tamaño del archivo/carpeta

Se deberá ver tal que así:

```
📁 src                       -
📄 index.js                  -
📄 secret.txt                2.67 KB
```

## Segundo ejercicio

Ahora que tenemos la lista de todos los archivos y carpetas, debemos permitir que el usuario pueda ordenarlos por nombre, de forma ascendente o descendente.

Esto lo harás con los flags `--asc` y `--desc`. Si el usuario no pone ninguno de ellos, se mostrará en el orden original.

## Tercer ejercicio

Siguiendo con la misma lógica que hemos aplicado en el ejercicio anterior, ahora deberás permitir que el usuario pueda filtrar archivos o carpetas.

Esto lo harás con los flags `--files` y `--folders`. Si el usuario no pone ninguno de ellos, mostrará todos los archivos y carpetas.

**IMPORTANTE:** El usuario podrá poner los flags en cualquier lugar del comando, por ejemplo:

```
node cli --files --asc
node cli --asc --files
node cli --files --asc
node cli --files
node cli --asc
node cli
```

## Cuarto ejercicio

Ya que Node.js permite leer/escribir archivos en cualquier lugar del sistema, debemos avisarle al usuario que tiene que habilitar los permisos necesarios para leer el directorio que quiere listar.

Por lo que tendrás que evaluar si el usuario tiene permisos para leer, y en caso de no tenerlos, mostrar un mensaje de error claro.
