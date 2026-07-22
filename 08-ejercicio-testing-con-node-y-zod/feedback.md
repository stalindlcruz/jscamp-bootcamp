Hola! Me gustó como encaraste los tests, muy bien hecho!
Dejamos algunos comentarios en `app.test.js` para mejorar un poco más la testabilidad y escalabilidad de los tests.

Si lo puedes ver genial! Cualquier cosa nos avisas
Un saludo y a seguir trabajando como lo estas haciendo!

PD: Cambié tu script en `package.json` para que haya:
- test
- test:watch

Hice esta separación porque más adelante cuando veamos CI/CD, será importante que los tests no estén por defecto en watch mode (necesitamos que el test corra y se cierre el proceso, no que se quede esperando).