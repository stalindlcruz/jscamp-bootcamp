<!-- Aquí puedes introducir tus dudas sobre el ejercicio, la consigna, la corrección, etc -->

Hola, muchas gracias sobre los comentarios y las mejoras proporcionadas en los comentarios.

# fetch-data.js

Primero, no conocía lo de createDocumentFragment(). Lo investigué y me gustó mucho saber que cuando lo usamos es como una caja vacía (virtual) para crear dentro nuestros elementos y luego transferirlos al elemento que tenemos en el DOM. Lo más importante es que mejora el rendimiento porque solo causa un reflow en lugar de múltiples, ya que construimos todo en memoria primero y lo insertamos de una sola vez.
