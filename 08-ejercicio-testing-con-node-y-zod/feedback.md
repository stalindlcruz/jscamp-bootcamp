Hola! Me gustó como encaraste los tests, muy bien hecho!
Dejamos algunos comentarios en `app.test.js` para mejorar un poco más la testabilidad y escalabilidad de los tests.

Si lo puedes ver genial! Cualquier cosa nos avisas
Un saludo y a seguir trabajando como lo estas haciendo!

PD: Cambié tu script en `package.json` para que haya:

- test
- test:watch

Hice esta separación porque más adelante cuando veamos CI/CD, será importante que los tests no estén por defecto en watch mode (necesitamos que el test corra y se cierre el proceso, no que se quede esperando).

## Gracias por los comentarios y los tips

1. Apliqué el tip recomendado para no tener que usar id harcodeados.
2. También hice lo mismo para cuando obtenemos el job por el id: creé un número random basado en el length de los trabajos, para luego con ese indice random poder acceder a diferentes jobs.
3. Thanks por el método de los array (repeat()) la verdad no lo había visto jajajaj, eres un crack y se muchísimo mas claro y limpio la verdad
4. Para lo de eliminar el jod por el id hice lo recomendado en tu comentario: hice POST de un nuevo job, guarde su id en una const, luego hice fetch para verificar que existe, lo elimine y por último volvi hacer fetch para comprobar que no estaba.
5. Adicionalmente, agregué una mejora para filtrar los jobs por technology sin tener que pasar la tecnología hardcodeada. Hice un fetch para obtener todos los trabajos, y de ahí obtuve un índice random para elegir un job random. Luego, basándome en ese job random, accedí a su array de technology y elegí una tecnología random de las que ya incluía ese array. Finalmente, usé esa tecnología para filtrar y comparé que todos los jobs devueltos la incluyeran.
6. También hice lo mismo para el PATCH, para no usar un ID hardcodeado: creé un job nuevo y le hice el update parcial solo a ese trabajo. Por último, eliminé ese job para no dejar residuos.

La verdad gracias por todos tus tips que me ayudan bastante a mejorar cada día (eres el mejor jejeje), me he dado cuenta que cuando piensas que en tu código todo esta bien siempre existen cosas que se pueden mejorar, me tome el tiempo de hacer algunas otras pequeñas mejoras que imagino te daras cuenta y espero que ahora este mejor.
