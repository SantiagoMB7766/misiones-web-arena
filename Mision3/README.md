# Mi lista de estudio

Misión 3 de Programación Web I.

Es una aplicación hecha con React para organizar las tareas que tengo pendientes de estudiar. Puedo añadir tareas, marcarlas como terminadas, eliminarlas y filtrarlas.

También puedo marcar tareas como prioritarias y verlas por separado. El botón «Elige por mí» escoge una tarea pendiente al azar, dando preferencia a las prioritarias. Las tareas se guardan en el navegador para que no se borren al recargar la página.

## Uso de IA

He utilizado ChatGPT para desarrollar y revisar la aplicación, trabajando con los conceptos de las tres primeras unidades.

Estas son 13 consultas que resumen las fases del desarrollo, aunque no son una transcripción literal de los mensajes.

1. Para empezar con React, qué comando uso para crear el proyecto con Vite?

2. Quiero separar el formulario y la lista para no meter todo en App.jsx.

3. Tengo ya el input, pero cómo hago para que al darle al botón se añada la tarea?

4. No entiendo muy bien cómo funciona useState con un array, me lo explicas?

5. La función de añadir tareas la tengo en App, cómo se la paso al formulario?

6. Ya puedo añadir tareas, ahora quiero que salgan todas en una lista usando map.

7. Me falta que al pulsar una tarea se marque como hecha y que también pueda desmarcarla.

8. Para borrar una tarea puedo usar filter? No quiero modificar el array directamente.

9. Quiero poner tres botones para ver todas, las pendientes y las terminadas.

10. El contador de tareas terminadas puedo calcularlo sin crear otro useState?

11. Al recargar la página se me borran las tareas, cómo puedo guardarlas con localStorage en un hook?

12. Se me ha ocurrido poner un botón que elija una tarea pendiente al azar con Math.random, pero dando prioridad a las importantes.

13. Vite arranca bien pero la pantalla sale en blanco, qué puede estar pasando?

ChatGPT me ayudó a generar los componentes, explicar las funciones y revisar errores del proyecto. También lo utilicé para simplificar el código y mantenerlo dentro de lo visto en clase.

## Autopsia

1. Contador de tareas

Para contar las tareas terminadas utilizo los datos que ya tengo en el array, en vez de crear otro `useState`.

La otra opción era guardar un contador por separado, pero tendría que actualizarlo cada vez que añadiese, borrase o marcase una tarea. Así me resulta más sencillo y evito que los valores se desajusten.

2. Guardado de tareas

He utilizado `useEffect` dentro del hook `useListaGuardada` para guardar las tareas en `localStorage` cada vez que cambia la lista.

También podría haber puesto el guardado dentro de cada función, pero tendría que repetir el mismo código varias veces. Con el hook lo dejo en un único sitio y no mezclo el guardado con las funciones de `App`.