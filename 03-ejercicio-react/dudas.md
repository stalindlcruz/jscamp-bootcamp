# Aquí puedes dejar tus dudas

## Primera parte

<!-- Dudas de la primera parte del ejercicio -->

## Segunda parte

<!-- Dudas de la segunda parte del ejercicio -->

## Tercera parte

<!-- Dudas de la tercera parte del ejercicio -->

## Cuarta parte

<!-- Dudas de la cuarta parte del ejercicio -->

Tengo la siguiente sobre el boton que le estamos haciendo el .map y es que en el onClick cuando le pasamos la función de lo que hará cuando el usuario haga click, le debemos pasar el page pero en este caso también le pase el event, para poder prevenir el comportamiento por defecto, pero me he dado cuenta que los botones solo tienen un comportamiento por defecto de "submit" dentro de un form.

Mi pregunta sería la siguiente:

Sería buena práctica recibir el event y prevenir su comportamiento por defecto aunque no este haciendo nada o simplemente no usarlo?

**Respuesta:**
Muy buena pregunta! En este caso no hace falta pasar el `event`. Los `event` son necesarios cuando el comportamiento por defecto realmente afecta lo que queremos hacer, como un submit de un formulario o una navegación de un link. En los botones, si dejar el `event` no afecta la experiencia del usuario, no es necesario usarlo.

## Quinta parte

<!-- Dudas de la quinta parte del ejercicio -->

## Sexta parte

<!-- Dudas de la sexta parte del ejercicio -->

## Séptima parte

<!-- Dudas de la séptima parte del ejercicio -->

En esta parte del ejercicio, hice algo diferente a lo en el componente Route, en vez de solo comparar el path con el currentPathname, decidí usar un .find() para encontrar el route que coincida con el currentPathname. Porque en el caso de que no se encuentre el route, se renderice el componente NotFoundPage por defecto cada vez que el usuario navegue a una ruta que no existe.

Mis preguntas serían las siguientes:

1. No se si fue buena práctica crear un array de objetos donde paso la ruta y el componente en en mi hook useRouter en ves de pasarselos por props en App.jsx.

2. Otra duda es que no se si fue buena práctica usar un .find() para encontrar el route que coincida con el currentPathname o es mejor usar un .filter() para encontrar el route que coincida con el currentPathname?

**Respuesta:**
Me llamó la atención como lo resolviste, y en el buen sentido :) Es una manera diferente de resolver la misma problemática.

Lo que podes hacer en vez de usar un array y ejecutar un `.find()` es usar un `Map` o un `Object` para mapear las rutas con sus componentes, y luego simplemente acceder al componente por la ruta.

Algo así:

```javascript
const routes = {
  "/": Home,
  "/about": About,
  "/contact": Contact,
};
```

Y luego en el hook useRouter:

```javascript
const currentRoute = routes[currentPathname] || NotFoundPage;
```

Esto evita que tengamos que ejecutar un `.find()`.

Lo que evitaría es usar un `.filter()` porque eso haría un recorrido completo del array, y lo que queremos es encontrar el primer elemento que coincida con la ruta.

## Ejercicio extra

<!-- Dudas del ejercicio extra -->
