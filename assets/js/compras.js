/* En JavaScript, el código que se encuentra fuera de cualquier función 
(a menudo llamado "código de nivel superior" o "código global") 
se ejecuta una sola vez cuando se carga el archivo JavaScript. 
Esto incluye la definición de funciones, la creación de variables, 
y cualquier otro código que se ejecute directamente.

En este caso, la variable total se inicializa a 0, solo una vez (cuando se carga el archivo JavaScript).
*/
let total = 0;  // Inicializa la variable total para llevar la suma de los precios de los artículos.

// Esta función agrega un nuevo artículo a la lista de compras.
function agregarItem() {
    /* 
    En JavaScript, la palabra clave `const` se usa para declarar una variable 
    cuyo valor no se supone que cambie una vez asignado. 
    En otras palabras, una vez que asignas un valor a una variable `const`, 
    no puedes reasignarla a un nuevo valor.
    En la función`agregarItem`, todas las variables son declaradas como `const` 
    porque su valor no se modifica después de la asignación inicial.
    Aquí hay una descripción de cada una:
    - `nombreItem`, `precioItem`: Estos son objetos que representan los elementos de entrada en el DOM
    (Document Object Model) para el nombre del artículo y el precio.
    Una vez que seleccionamos estos elementos, no necesitamos cambiar a qué elementos se refieren estas variables, 
    por lo que se declaran como`const`.
    - `nombreError`, `precioError`: Estos son objetos que representan los elementos en el DOM 
    donde se mostrarán los mensajes de error.
    Al igual que con `nombreItem` y`precioItem`, una vez seleccionados estos elementos, 
    no necesitamos cambiar a qué elementos se refieren estas variables.
    - `lista`: Este es un objeto que representa el elemento de la lista en el DOM 
    donde se agregarán los nuevos elementos de la lista.
    Nuevamente, no necesitamos cambiar a qué elemento se refiere esta variable después de seleccionarlo.
    - `nuevoItem`: Este es un nuevo elemento de la lista que creamos cada vez que se llama a la función`agregarItem`.
    Después de crear este elemento, no necesitamos reasignar esta variable a un nuevo valor.
    - `precioFormateado`: Este es el precio formateado del artículo.
    Una vez que lo calculamos, no necesitamos cambiar este valor.
    
    Usar `const` para estas variables hace que el código sea más seguro 
    porque nos aseguramos de que estas variables no se reasignen accidentalmente 
    a nuevos valores más adelante en la función.
    Además, hace que el código sea más fácil de entender porque sabemos que el valor de estas variables 
    no cambiará después de la asignación inicial.
    Sin embargo, es importante recordar que `const` no hace que el valor en sí sea inmutable, 
    solo que la variable no puede ser reasignada a un nuevo valor.
    */

    // Selecciona los elementos de entrada y los mensajes de error de la página.
    const nombreItem = document.querySelector('#nombreItem');
    const precioItem = document.querySelector('#precioItem');
    const nombreError = document.querySelector('#nombreError');
    const precioError = document.querySelector('#precioError');
    const lista = document.querySelector('#lista');

    // Limpia los mensajes de error.
    nombreError.textContent = "";
    precioError.textContent = "";

    // Comprueba que se ha introducido un nombre de artículo.
    if (nombreItem.value.trim() === '') {
        nombreError.textContent = "Debe introducir un nombre de artículo.";
        return;
    }

    // Comprueba que se ha introducido un precio.
    if (precioItem.value === '') {
        precioError.textContent = "Debe introducir un precio.";
        return;
    }

    // Comprueba que el precio introducido es un número entero positivo.
    if (!Number.isInteger(+precioItem.value) || +precioItem.value <= 0) {
        precioError.textContent = "El precio debe ser mayor a cero.";
        return;
    }

    // Obtén una referencia al cuerpo de la tabla.
    /*
    El método `querySelector` es una función de JavaScript que permite seleccionar 
    el primer elemento de un documento HTML que coincida con el selector CSS proporcionado. 
    En este caso, el selector es "#lista tbody".
    "#lista tbody" es un selector CSS que selecciona el elemento `<tbody>` 
    que es descendiente directo del elemento con el ID "lista". 
    Aquí están los detalles:
    - "#" es el prefijo que se utiliza para seleccionar elementos por su ID en CSS. 
    Por lo tanto, "#lista" selecciona el elemento con el ID "lista".
    - El espacio entre "#lista" y "tbody" indica que estamos seleccionando un descendiente de "#lista". 
    Un descendiente es un elemento que está anidado dentro de otro, no necesariamente de forma inmediata.
    - "tbody" es el nombre de la etiqueta del elemento que estamos seleccionando.
    
    Entonces, en resumen, la línea de código `const tbody = document.querySelector("#lista tbody");` 
    está obteniendo una referencia al elemento `<tbody>` que está dentro del elemento con el ID "lista". 
    Esta referencia se almacena en la variable `tbody`, y se puede usar para manipular el elemento `<tbody>` 
    en el código JavaScript.
    */

    const tbody = document.querySelector("#lista tbody");

    // Crea una nueva fila de la tabla (tr).
    const nuevaFila = document.createElement("tr");

    // Crea la celda para el nombre del artículo.
    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombreItem.value;

    // Crea la celda para el precio.
    const celdaPrecio = document.createElement("td");

    // Convierte el precio a un formato de moneda con separador de miles.
    const precioFormateado = (+precioItem.value).toLocaleString("en-US", { minimumFractionDigits: 2 });
    celdaPrecio.textContent = `$${precioFormateado}`;

    // Añade las celdas a la fila.
    nuevaFila.appendChild(celdaNombre);
    nuevaFila.appendChild(celdaPrecio);

    // Añade la nueva fila al cuerpo de la tabla.
    tbody.appendChild(nuevaFila);


    // Actualiza el total y lo muestra en la página.
    total += +precioItem.value;
    const totalFormateado = total.toLocaleString("en-US", { minimumFractionDigits: 2 });
    document.querySelector('#totalValue').textContent = `$${totalFormateado}`;


    // Limpia los campos de entrada.
    nombreItem.value = "";
    precioItem.value = "";
}


function limpiarItems() {
    // Accede al cuerpo de la tabla y borra su contenido
    const tablaCuerpo = document.querySelector("#lista tbody");
    tablaCuerpo.innerHTML = "";

    // Accede al elemento del total y restablece su valor
    const totalValue = document.querySelector("#totalValue");
    totalValue.textContent = "$0.00";

    // Resetear el valor de total
    total = 0;
}
