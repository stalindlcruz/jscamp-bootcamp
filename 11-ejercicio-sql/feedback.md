<!-- Aquí irá el feedback del ejercicio -->

Excelente trabajo! Era un ejercicio complejo y lo abordaste muy bien, te felicito!

Hicimos unos cuantos cambios para mejorar la DX (developer experience) y algunas cositas técnicas que había que mejorar.

Cualquier duda sobre eso, nos puedes preguntar si?
A seguir trabajando!

## Respuesta

- Gracias, de verdad siendo honesto para mí este fue hasta ahora el ejercicio que mas se me complicó porque cuando llegue al punto 3 ni sabia por donde empezar, no entiendo porque SQL se me hizo facil entenderlo y practicarlo en el playground, pero cuando llego el momento de integrarlo en codigo real me sentí lo mas perdido en lo que llevamos trabajando en el bootcamp. Por momentos sentí que quizas esto no es para mi por no poder entender esto a la primera, pero se que con práctica y dedicandole tiempo seguiré mejorando.

- Por otra parte leyendo tu codigo y revisando cada decision que tomaste lo hace parecer tan fáccil que solo me digo a mismo "Como no se me ocurrieron esas ideas jajajajajaj".

- Gracias por todos tus comentarios, seguiré avanzando en el Bootcamp que ya queda poco y seguir aprendiendo.

---

Mateo:
jaja no te preocupes! Lo hiciste realmente muy bien. Es un ejercicio súper complicado y muy entreverado a nivel de consultas SQL y cómo vamos agregando las consultas a medida que vamos iterando los filtros.

Esto es mucha práctica, lo normal es que no lo entiendas a la primera. Ni a la segunda ni a la tercera. Es un proceso y es de a poco.

Lo que hicimos fue SQL puro, luego vas a ver alternativas que simplifican mucho la escritura de SQL. Como `prisma`, `supabase`, etc. Que por medio de funciones JavaScript, se hace todo lo que tu hiciste a mano, pero de manera interna, con una DX (developer experience) mucho mejor.

Por ejemplo:
```ts
// Traer un job por id
const { data: job, error } = await supabase
  .from('jobs')
  .select('*')
  .eq('id', '7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4')
  .single()

// Listar jobs remotos, nivel senior, ordenados por más reciente
const { data: jobs, error: jobsError } = await supabase
  .from('jobs')
  .select('id, title, company, location, modality, level, technologies')
  .eq('modality', 'remote')
  .eq('level', 'senior')
  .order('created_at', { ascending: false })
  .range(0, 19) // paginación (0-19 = primeros 20)

// Filtrar por tecnología (si technologies es text[])
const { data: reactJobs, error: reactError } = await supabase
  .from('jobs')
  .select('*')
  .contains('technologies', ['react'])
```

Esto no lo dimos de entrada por lo siguiente:
**Cuando te acostumbras a lo simple, después es difícil ir a lo complejo.**

Preferimos que aprendas a escribir SQL puro, y luego que entiendas como funciona, podes ir a herramientas que te hacen el trabajo mas "simple".

A seguir que vas por un muy bien camino! Aquí estamos para ayudarte :)

PD: Me ha pasado 1000 veces también que no sirvo para esto, es parte del proceso. Un día te sentís superman y al otro el peor programador el mundo. A normalizarlo, entender que el camino tiene subidas y bajadas y a hacer lo que uno disfruta hacer. Si sos constante, vas a mejorar. Tener un día malo también es dar un paso adelante.
