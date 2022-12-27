
// genero una base de datos de los productos usando estructura JSON
// cuando se ejecuta el HTML levanta la lista de productos de este JSON y los muestra en el HTML por DOM
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Bulbasaur',
            precio: 12500,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/001.png'
        },
        {
            id: 2,
            nombre: 'Ivysaur',
            precio: 12500,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/002.png'
        },
        {
            id: 3,
            nombre: 'Venusaur',
            precio: 10000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/003.png'
        },
        {
            id: 4,
            nombre: 'Charmander',
            precio: 11300,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/004.png'
        },
        {
            id: 5,
            nombre: 'Charizard',
            precio: 11300,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/006.png'
        },
        {
            id: 6,
            nombre: 'Wartortle',
            precio: 11300,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/008.png'
        },
        {
            id: 7,
            nombre: 'Caterpie',
            precio: 11300,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/010.png'
        },
        {
            id: 8,
            nombre: 'Metapod',
            precio: 11300,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/011.png'
        },

    ];

    let carrito = [];
    const divisa = '$'; // define el símbolo de la moneda
    const itemsDOM = document.querySelector('#items'); // Objeto de los ítems que levanta de la base de datos
    const carritoDOM = document.querySelector('#carrito'); // Objeto del carrito de compras
    const totalDOM = document.querySelector('#total'); // Objeto donde despliega el total del carrito
    const vaciarBotonDOM = document.querySelector('#boton-vaciar'); // Objeto del boton que vacia el carrito
    const miLocalStorage = window.localStorage; // acceso al localStorage para guardar datos del carrito

    // Funciones

    // Publica todos los productos a partir del JSON que hace de base de datos.
 
    function publicaProductos() {
        
        baseDeDatos.forEach((info) => {
            // Define la estrucutra
            const miNuevoNodo = document.createElement('div');
            miNuevoNodo.classList.add('card', 'col-sm-4', 'text-center', 'card_agregada');
            // Define el Body
            const miNuevoNodoCardBody = document.createElement('div');
            miNuevoNodoCardBody.classList.add('card-body');
            // Define el Titulo
            const miNuevoNodoTitle = document.createElement('h5');
            miNuevoNodoTitle.classList.add('card-title');
            miNuevoNodoTitle.textContent = info.nombre;
            // Define la Imagen
            const miNuevoNodoImagen = document.createElement('img');
            miNuevoNodoImagen.classList.add('img-fluid');
            miNuevoNodoImagen.setAttribute('src', info.imagen);
            // Define el Precio
            const miNuevoNodoPrecio = document.createElement('p');
            miNuevoNodoPrecio.classList.add('card-text');
            miNuevoNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Define el Boton 
            const miNuevoNodoBoton = document.createElement('button');
            miNuevoNodoBoton.classList.add('btn', 'btn-primary');
            miNuevoNodoBoton.textContent = '+';
            miNuevoNodoBoton.setAttribute('marcador', info.id);
            miNuevoNodoBoton.addEventListener('click', agregaProdCarrito);
            // Insertamos
            miNuevoNodoCardBody.appendChild(miNuevoNodoImagen);
            miNuevoNodoCardBody.appendChild(miNuevoNodoTitle);
            miNuevoNodoCardBody.appendChild(miNuevoNodoPrecio);
            miNuevoNodoCardBody.appendChild(miNuevoNodoBoton);
            miNuevoNodo.appendChild(miNuevoNodoCardBody);
            itemsDOM.appendChild(miNuevoNodo);
        });
    }


    // Añade productos al carrito de la compra

    function agregaProdCarrito(evento) {
        // Añade el Nodo al carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Refresca el carrito 
        refreshCarrito();
        // Actualiza LocalStorage
        grabaCarritoLocalStore();

    }

    // Muestra los productos del carrito

    function refreshCarrito() {
        // Se vacia el carrito en el HTML
        carritoDOM.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        console.log(carrito);
        console.log(carritoSinDuplicados);

        // Se generan los Nodos en el carrito.. Se verifica que no se generen duplicados.
        carritoSinDuplicados.forEach((item) => {
            // Se obtiene el elemento deseado de la Base de Datos usando filter
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // verifica si coinciden los ID
                return itemBaseDatos.id === parseInt(item);
            });

            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // Si coinciden los ID se incrementa el contador, sino mantengo el contador
                return itemId === item ? total += 1 : total;
            }, 0);

            // Creamos el nodo del item del carrito
            // se agregan definiciones específicas de clases para ser interpretadas por Bootstrap
            const miNuevoNodo = document.createElement('li');
            miNuevoNodo.classList.add('list-group-item', 'text-right', 'mx-2', 'item_agregado');
            miNuevoNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarProdCarrito);
            // Se publica....
            miNuevoNodo.appendChild(miBoton);
            carritoDOM.appendChild(miNuevoNodo);
        });
       // Se refresca el precio total en el HTML
       totalDOM.textContent = calcularTotal();
    }


    // Función para borrar del carrito un producto específico

    function borrarProdCarrito(evento) {
        // Obtengo el ID del producto donde se ha pulsado el botón de borrar
        const id = evento.target.dataset.item;
        // Se borra el producto según el ID
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        refreshCarrito();
        grabaCarritoLocalStore();
    }


     // Calcula el precio total teniendo en cuenta los productos repetidos

    function calcularTotal() {
        // Se recorre el array del carrito 
        return carrito.reduce((total, item) => {
            // Se obtiene el precio de cada elemento
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
 
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    // Vaciar el carrito

    function vaciarCarrito() {
        carrito = [];
        refreshCarrito();
        localStorage.clear();
    }

    function grabaCarritoLocalStore () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function leeCarritoLocalStore () {
        // Verifica si existe un carrito cargado en el LocalStorage
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    vaciarBotonDOM.addEventListener('click', vaciarCarrito);

    // Inicio
    leeCarritoLocalStore();
    publicaProductos();
    refreshCarrito();
  });
