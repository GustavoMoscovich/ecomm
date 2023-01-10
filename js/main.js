

// activación del módulo js para DarkMode


const options = {
    bottom: '83%', // default: '32px'
    //right: 'unset', // default: '32px'
    right: '5px', // default: '32px'
    //left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.75)), url("../multimedia/pokemon-fondo.jpg")',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

const darkmode = new Darkmode(options);
darkmode.showWidget();


// genero una base de datos de los productos usando estructura JSON
// cuando se ejecuta el HTML levanta la lista de productos de este JSON y los muestra en el HTML por DOM
// se genera otra "base de datos" de productos que serían "de oferta" para que sean publicados en el Slice

document.addEventListener('DOMContentLoaded', () => {
    // Variables

    const sliderOfertas = [     // base de datos de productos de Oferta para que se publiquen en el Slide
        {
            id: 101,
            nombre: 'Electrode',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/101.png'
        },
        {
            id: 102,
            nombre: 'Exeggcute',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/102.png'
        },
        {
            id: 103,
            nombre: 'Exeggutor',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/103.png'
        },
        {
            id: 104,
            nombre: 'Cubone',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/104.png'
        },
        {
            id: 105,
            nombre: 'Marowak',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/105.png'
        },
        {
            id: 106,
            nombre: 'Hitmonlee',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/106.png'
        },
        {
            id: 107,
            nombre: 'Hitmonchan',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/107.png'
        },
        {
            id: 108,
            nombre: 'Lickitung',
            precio: 8000,
            imagen: 'http://www.serebii.net/pokemongo/pokemon/108.png'
        },
    ];



    const baseDeDatos = [       // Base de datos de productos sin ofertas para que se publiquen en la grilla de productos
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

    const baseDeProductosTotal=baseDeDatos.concat(sliderOfertas) // concateno ambas bases de datos para usar en nvo array en tareas de filtrado, etc

    // se define el usuario y contraseña para el login al sitio

    const datosUsuario = {
        user: "usuario",
        password: "1234"
    }

    let carrito = [];
    const divisa = '$'; // define el símbolo de la moneda
    const itemsDOM = document.querySelector('#items'); // Objeto de los ítems que levanta de la base de datos
    const slidesDOM = document.querySelector('#slides'); // Objeto del slide de ofertas
    const carritoDOM = document.querySelector('#carrito'); // Objeto del carrito de compras
    const totalDOM = document.querySelector('#total'); // Objeto donde despliega el total del carrito
    const vaciarBotonDOM = document.querySelector('#boton-vaciar'); // Objeto del boton que vacia el carrito
    const miLocalStorage = window.localStorage; // acceso al localStorage para guardar datos del carrito
    const ordenaZABotonDOM = document.querySelector('#btn_ordena_za');
    const ordenaAZBotonDOM = document.querySelector('#btn_ordena_az');
    const ordenaPrecioBotonDOM = document.querySelector('#btn_ordena_pcio');


    // Funciones

    // funciones de validación del usuario para habilitar el uso del Ecommerce
    // cuando el usuario se loguea correctamente se registra un true en
    // SessionStorege para que al volver a ingresar reconozca que el usuario ya fue validado y muestre directamente el Ecommerce
    // Cuando el usuario hace el LogOut se elimina el registro en SessionStorega y vuelve a solicitar la validación de usuario y clave

    const grabaEnSs = ( key, value ) => {
        sessionStorage.setItem( key, JSON.stringify(value))
    }
    
    const infoDeSs = ( key, value ) => {
        const transformarAJson = JSON.stringify(value)
        sessionStorage.setItem(key, transformarAJson)
    }
    
    const consultaDeSs = ( key ) => {
        const valorDelSs = sessionStorage.getItem(key)
        return JSON.parse(valorDelSs)
    }
    
    const obtenerDelSs = ( key ) => {
        return JSON.parse(sessionStorage.getItem(key))
    }
    
    const formLogin = document.querySelector("#login_usuario")    
    const inputUser = document.querySelector("#input-user")
    const inputPass = document.querySelector("#input-pass")
    const contenedorFormulario = document.querySelector(".container-login")
    
    // opera sobre el submit del formulario del Login
    formLogin.onsubmit = ( e ) => {
        e.preventDefault()  
        if ( inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password ){
            grabaEnSs("login", true)
            validarUsuario(obtenerDelSs("login"))
        }    
    }
    
    // valida si el login está OK (true) para mantener abierto el Ecommerce para el usuario
    const validarUsuario = ( valor ) => {
        if ( valor === true ){                      // si el usuario es correcto se oculta el form de login y se habilita el Ecommerce y botón Logout
            document.querySelector(".form_login").style.display = "none"
            document.querySelector("#logout").style.display = "block"
            document.querySelector(".ecommerce").style.display = "block"
        } else {                                    // si el usuario NO es correcto se oculta el form Ecommerce y botón Logout y se habilita form de Login
            document.querySelector(".ecommerce").style.display = "none"
            document.querySelector(".form_login").style.display = "flex"
            document.querySelector("#logout").style.display = "none"
        }
    }


    validarUsuario(obtenerDelSs("login"))

    // Opera a partir del botón Logout.
    document.querySelector("#logout").onclick = () => {    
        sessionStorage.removeItem("login")
        validarUsuario(obtenerDelSs("login"))
    }

    // operaciones sobre el formulario del Ecommerce.....

    // Publica todos los productos a partir del JSON que hace de base de datos.
 
    function publicaProductos() {
        
        baseDeDatos.forEach((info) => {     // Recorre los datos de la base de datos y arma la "página de prodcutos" del Ecommerce
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

            // Inserta nuevo nodo usando las asignaciones realizadas
            miNuevoNodoCardBody.appendChild(miNuevoNodoImagen);
            miNuevoNodoCardBody.appendChild(miNuevoNodoTitle);
            miNuevoNodoCardBody.appendChild(miNuevoNodoPrecio);
            miNuevoNodoCardBody.appendChild(miNuevoNodoBoton);
            miNuevoNodo.appendChild(miNuevoNodoCardBody);
            itemsDOM.appendChild(miNuevoNodo);
        });
    }


    // Función que toma los productos "de oferta" y los publica en el Slide

    function generaSlides() {
        
        sliderOfertas.forEach((info) => {     // Recorre la base de Ofertas y publica en el Slider
            // Define la estrucutra
            const miNuevoNodo = document.createElement('div');
            miNuevoNodo.classList.add('swiper-slide');

            // Define la Imagen
            const miNuevoNodoImagen = document.createElement('img');
            miNuevoNodoImagen.setAttribute('src', info.imagen);

            // Define el Titulo
            const miNuevoNodoTitle = document.createElement('h5');
            miNuevoNodoTitle.textContent = info.nombre;

            // Define el Precio
            const miNuevoNodoPrecio = document.createElement('p');
            miNuevoNodoPrecio.textContent = `${info.precio}${divisa}`;

            // Define el Boton 
            const miNuevoNodoBoton = document.createElement('button');
            miNuevoNodoBoton.classList.add('btn', 'btn-primary','btn-sm');
            miNuevoNodoBoton.textContent = 'Lo Quiero';
            miNuevoNodoBoton.setAttribute('marcador', info.id);
            miNuevoNodoBoton.addEventListener('click', agregaProdCarrito);

            // Inserta nuevo nodo usando las asignaciones realizadas
            miNuevoNodo.appendChild(miNuevoNodoImagen);
            miNuevoNodo.appendChild(miNuevoNodoTitle);
            miNuevoNodo.appendChild(miNuevoNodoPrecio);
            miNuevoNodo.appendChild(miNuevoNodoBoton);
            slidesDOM.appendChild(miNuevoNodo);
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

        // Muestra msje al usuario
        Toastify({
            text: "Producto Agregado !",
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();

    }

    // Refresca la lista de productos del carrito de compra

    function refreshCarrito() {
        // Se vacia el carrito en el HTML
        carritoDOM.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];

        // Se generan los Nodos en el carrito.. Se verifica que no se generen duplicados.
        carritoSinDuplicados.forEach((item) => {

            // Se obtiene el elemento deseado de la Base de Datos usando filter
            const miItem = baseDeProductosTotal.filter((itemBaseDatos) => {

                // verifica si coinciden los ID
                return itemBaseDatos.id === parseInt(item);
            });

            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {

                // Si coinciden los ID se incrementa el contador, sino mantengo el contador
                return itemId === item ? total += 1 : total;
            }, 0);

            // Se crea el nodo del item en el carrito
            // se agregan definiciones específicas de clases para ser interpretadas por Bootstrap que se usa en el html
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

        // Muestra msje al usuario
        Toastify({
            text: "Producto Eliminado !",
            duration: 3000,
            style: {
              background: "red",
            },
          }).showToast();
    }

     // Calcula el precio total teniendo en cuenta los productos repetidos

    function calcularTotal() {
        // Se recorre el array del carrito 
        return carrito.reduce((total, item) => {
            // Se obtiene el precio de cada elemento
            const miItem = baseDeProductosTotal.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
 
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    // Vaciar el carrito

    function vaciarCarrito() {
        carrito = [];
        refreshCarrito();
        localStorage.removeItem('carrito');
    }

    // ordena los productos por el nombre de la Z a la A - luego publica los productos ordenados
    function ordenaDeZA() {
        baseDeDatos.sort(function (x, y) {
            if (x.nombre > y.nombre) {
                return -1;
            }
         
            if (x.nombre < y.nombre) {
                return 1;
            }
         
            return 0;
        });
        itemsDOM.textContent = '';
        publicaProductos();

    }
 
    // Ordena los productos por el nombre de la A a la Z - luego publica los productos ordenados
    function ordenaDeAZ() {
        baseDeDatos.sort(function (x, y) {
            if (x.nombre < y.nombre) {
                return -1;
            }
         
            if (x.nombre > y.nombre) {
                return 1;
            }
         
            return 0;
        });
        itemsDOM.textContent = '';
        publicaProductos();
    }

    // Ordena los productos por precio de menor a mayor - luego publica los productos ordenados
    function ordenaPrecio() {
        baseDeDatos.sort((x, y) => x.precio-y.precio);
        itemsDOM.textContent = '';
        publicaProductos();
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

    function refreshSlide () {                          // activa el slider
        const swiper = new Swiper('.mi-slider', {
            // Optional parameters
            direction: 'horizontal',
            //loop: true,
            slidesPerView: 3,
            spaceBetween: 10,
            autoplay: {
                delay: 2000,
            },          
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        
          });
    }

    // todo este bloque hace el filtro por nombre de los productos
    // se busca que el nombre del producto "contenga" el/los caracteres escritos por el usuario
    // lo que hace es recorrer la lista de productos y agregarles por FALSE una clase que en el css solo indica "display: none"
    // por TRUE lo que hace es eliminar la clase

    const formBuscar = document.querySelector("#formulario-buscar")    
    const nombreABuscar = document.querySelector("#buscar")
    
    // opera sobre el submit del formulario busqueda
    formBuscar.onsubmit = ( e ) => {
        e.preventDefault()  
        itemsDOM.querySelectorAll(".card_agregada").forEach(producto => producto.textContent.toLowerCase().includes(nombreABuscar.value.toLowerCase()) ? producto.classList.remove("filtro") : producto.classList.add("filtro") 
             );
    }

    formBuscar.onsearch = ( e ) => {
        e.preventDefault()  
        itemsDOM.querySelectorAll(".card_agregada").forEach(producto => producto.textContent.toLowerCase().includes(nombreABuscar.value.toLowerCase()) ? producto.classList.remove("filtro") : producto.classList.add("filtro") 
             );
    }

    // fin del bloque de código que realiza la "busqueda" de productos

    // Eventos
    vaciarBotonDOM.addEventListener('click', vaciarCarrito);
    ordenaZABotonDOM.addEventListener('click', ordenaDeZA);
    ordenaAZBotonDOM.addEventListener('click', ordenaDeAZ);
    ordenaPrecioBotonDOM.addEventListener('click', ordenaPrecio);

    // Inicio
    leeCarritoLocalStore();
    generaSlides();
    refreshSlide();
    publicaProductos();
    refreshCarrito();
  });
