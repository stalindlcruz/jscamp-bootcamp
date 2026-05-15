# Aquí puedes dejar tus dudas

## Primera parte

<!-- Dudas de la primera parte del ejercicio -->

Tengo la siguiente sobre la etiqueta form que usamos en nuestro componente SearchFormSection, usamos un key y le agregamos un id que se va a incrementar con useState cada ves que el usuario haga click en handleClearInput para destruir y recrear el componente completamente, pero también en mi hook useSearchForm estoy limpiando los valores con inputRef. Ya que las dos formas hacen básicamente lo mismo, Cuál de las dos sería la mejor práctica de hacerlo?

**Respuesta:**

Oculté de tu código la parte donde usas `key` para destruir y recrear el componente.
Aquí hay dos diferencias muy grandes:
1. `key` elimina y vuelve a crear el componente completo, lo que significa que todos los estados internos se reinician, NO los externos.
2. Tu función de `reset` afecta los estados sin necesidad de recrear el componente.

En tu caso, no funcionaba solo el `reset` porque tus select tenían `defaultValue` y no `value`.
`defaultValue` es muy diferente a `value` dentro de React porque este último es el que se encarga de actualizar el valor del input cuando cambia el estado, `defaultValue` no lo hace.

En resumen, no hace falta que uses `key` para reconstruir tu componente. Modificando tu estado de filtros a su valor inicial ya debería ser suficiente para actualizar los valores de los inputs (que de hecho es ahora lo qur hace).

## Segunda parte

<!-- Dudas de la segunda parte del ejercicio -->

## Tercera parte

<!-- Dudas de la tercera parte del ejercicio -->

## Cuarta parte

<!-- Dudas de la cuarta parte del ejercicio -->

## Quinta parte

<!-- Dudas de la quinta parte del ejercicio -->

## Sexta parte

<!-- Dudas de la sexta parte del ejercicio -->
