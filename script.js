//////////////////////// Simulador de Tienda de Objetos MMORPG "Tienda de las Rarezas".  ////////////////////////
header.innerText = "";

//////////////////////// Bienvenida a la pagina.  ////////////////////////
//Recopilacion de datos del usuario para almacenamiento en localStorage.
titulo.innerText = "Tienda de las Rarezas";
const bienvenidaUsuario = document.getElementById("bienvenidaUsuario")
const nombreInicial = localStorage.getItem("nombreUsuario")
bienvenidaUsuario.innerText =
    `Bienvenido a la Tienda de las Rarezas!\n ${nombreInicial ? nombreInicial : `Dime tu nombre aventurero..` }`;
//Cree una constante para guardar en el nombre del usuario en localStorage.
const guardarNombre = (event) => {
    //Prevenimos que la pagina se actualize al ejecutar el submit del form.
    event.preventDefault()
    const input = document.getElementById('inputNombre')
    const nombre = input.value
    //Esta alternativa obtiene el nombre creando FormData desde el formulario.
    //const form = event.target
    //const data = new FormData(form)
    //const nombre = data.get("nombre")
    //Guardamos el nombre en local storage y actualizamos el mensaje de bienvenida.
    localStorage.setItem("nombreUsuario", nombre)
    bienvenidaUsuario.innerText = `Bienvenido a la Tienda de las Rarezas!\n ${nombre}`;
};

//////////////////////// Construccion de usuario.  ////////////////////////
//Valores por defecto.
const DEFAULT_ORO = 200
const DEFAULT_CAPACIDAD = 60
//Cree una class que contiene todas las propiedades del usuario.
class Usuario {
    constructor(nombre) {
        (this.id = 0),
        (this.nombre = nombre),
        (this.nivel = null),
        (this.vidaInicial = 100),
        (this.ataqueBasico = 0),
        (this.probabilidadCritico = 0),
        (this.defensaInicial = 0),
        (this.inventario = []),
        (this.capacidadInventario = DEFAULT_CAPACIDAD),
        (this.balanceOro = DEFAULT_ORO);
    }
};
let usuario = new Usuario("NombreUsuario");
//Cree un contenedor que muestra los datos del usuario de forma dinamica en el documento HTML.
const contenedorDatos = document.getElementById("contenedorDatos");
mostrarDatos();
function mostrarDatos() {
    contenedorDatos.appendChild(nombreUsuario);
    contenedorDatos.appendChild(nivelUsuario);
    contenedorDatos.appendChild(balanceOroUsuario);
    contenedorDatos.appendChild(capacidadInventarioUsuario);
};
//Funcion para mostrar los datos del usuario.
function mostrarDatos() {
    const contenedorDatos = document.getElementById("contenedorDatos");
    contenedorDatos.innerHTML = "";
    const nombreUsuario = document.createElement("p");
    nombreUsuario.innerText = `${usuario.nombre}`;
    contenedorDatos.appendChild(nombreUsuario);
    const nivelUsuario = document.createElement("p");
    nivelUsuario.innerText = `Nivel: ${usuario.nivel}`;
    contenedorDatos.appendChild(nivelUsuario);
    const balanceOroUsuario = document.createElement("p");
    balanceOroUsuario.innerText = `Balance de Oro: ${usuario.balanceOro}`;
    contenedorDatos.appendChild(balanceOroUsuario);
    const capacidadInventarioUsuario = document.createElement("p");
    capacidadInventarioUsuario.innerText = `Capacidad del Inventario: ${usuario.capacidadInventario}`;
    contenedorDatos.appendChild(capacidadInventarioUsuario);
};

//////////////////////// Construccion de Inventario.  ////////////////////////
//Esta funcion lee y retorna si existe un Inventario previamente guardado en localStorage.
inicializarInventario()

function inicializarInventario() {
    let inventarioString = localStorage.getItem("inventario")
    let inventario = JSON.parse(inventarioString)
    if (inventarioString) {
        usuario.inventario = inventario
    }
    mostrarInventario()
};
//Función para mostrar los objetos en el inventario.
function mostrarInventario() {
    contenedorInventario.innerHTML = "";
    if (usuario.inventario.length === 0) {
        //Mostrar este mensaje en caso de que el inventario esté vacío.
        const mensaje = document.createElement("p");
        mensaje.innerText = "El inventario está vacío.";
        contenedorInventario.appendChild(mensaje);
    } else {
        usuario.inventario.forEach((objeto) => {
            const div = document.createElement("div");
            div.id = objeto.id;
            div.innerHTML = `<img src="" alt="">
                        <p>${objeto.nombre}</p>
                        <p>${objeto.pasiva}</p>
                        <p>${objeto.elemento}</p>
                        <p>${objeto.categoria}</p>
                        <button>Equipar</button>`;
            contenedorInventario.appendChild(div);
        });
    }
};
//Esta funcion guarda el inventario en localStorage utilizando JSON.stringify.
function guardarInventario(usuario) {
    const inventario = usuario.inventario
    const inventarioString = JSON.stringify(inventario)
    localStorage.setItem('inventario', inventarioString)
};
//Esta funcion borra el contenido del inventario almacenado en localStorage.
//Actualiza las propiedades de capacidadInventario y balanceOro por los valores default.
function borrarInventario() {
    usuario.inventario = []
    usuario.balanceOro = DEFAULT_ORO
    usuario.capacidadInventario = DEFAULT_CAPACIDAD
    localStorage.removeItem("inventario")
    mostrarDatos()
    mostrarInventario()
};

//////////////////////// Construccion de Tienda.  ////////////////////////
//Cree una class que contiene un constructor con todas las propiedades de los objetos.
class Objeto {
    constructor(
        id,
        nombre,
        elemento,
        categoria,
        tipoAtaque,
        tipoDefensa,
        ataqueBasico,
        defensa,
        probabilidadCritico,
        aumentoVida,
        pasiva,
        peso,
        precio
    ) {
        this.id = id;
        this.nombre = nombre;
        this.elemento = elemento;
        this.categoria = categoria;
        this.tipoAtaque = tipoAtaque;
        this.tipoDefensa = tipoDefensa;
        this.ataqueBasico = ataqueBasico;
        this.defensa = defensa;
        this.probabilidadCritico = probabilidadCritico;
        this.aumentoVida = aumentoVida;
        this.pasiva = pasiva;
        this.peso = peso;
        this.precio = precio;
    }
};
//Construi estos objetos.
const latigodelDruida = new Objeto(
    1,
    "El Latigo del Druida",
    "Madera",
    "Ataque",
    "Magico",
    null,
    15,
    0,
    0.1,
    10,
    "Alma Salvaje: este arma aumenta la efectividad de las habilidades de invocación y control de animales.",
    15,
    75
);
const mantoDeHojas = new Objeto(
    2,
    "El Manto de Hojas",
    "Madera",
    "Defensa",
    null,
    "Resistencia Magica",
    0,
    25,
    0.0,
    50,
    "Simbiosis: esta vestimenta tiene la habilidad de otorgar a su poseedor un vínculo simbiótico con el entorno natural, lo que le otorga un aumento de velocidad en la regeneración de vida.",
    30,
    100
);
const guanteDelMinero = new Objeto(
    3,
    "El Guante del Minero",
    "Metal",
    "Ataque",
    "Fisico",
    null,
    20,
    0,
    0.12,
    0,
    "Buscador de tesoros: aumento en la probabilidad de encontrar objetos raros o valiosos, como gemas o minerales especiales, lo que permite al personaje obtener recursos más valiosos y útiles.",
    25,
    90
);
const hombrerasDeLaMontaña = new Objeto(
    4,
    "Las Hombreras de la Montaña",
    "Metal",
    "Defensa",
    null,
    "Dureza Fisica",
    0,
    50,
    0.0,
    0,
    "Resistencia férrea: cuando tengas menos del 10% de salud, aumentara considerablemente la resistencia del personaje a ataques físicos.",
    35,
    120
);
//Cree el array objetos=[].
const objetos = [
    latigodelDruida,
    mantoDeHojas,
    guanteDelMinero,
    hombrerasDeLaMontaña,
];
//Cree un contenedor que muestra los objetos existentes de forma dinamica en el documento HTML.
const contenedorObjetos = document.getElementById("contenedorObjetos");
objetos.forEach((objeto) => {
    const div = document.createElement("div");
    div.id = objeto.id;
    div.innerHTML = `<img src="" alt="">
                <p>${objeto.nombre}</p>
                <p>${objeto.pasiva}</p>
                <p>${objeto.elemento}</p>
                <p>${objeto.categoria}</p>
                <button onclick="comprarObjeto(${objeto.id})">Adquirir objeto por ${objeto.precio} de Oro</button>`;
    contenedorObjetos.appendChild(div);
});
//Funcion comprarObjeto().
function comprarObjeto(objetoId) {
    const objeto = objetos.find((obj) => obj.id === objetoId);
    if (!objeto) {
        alert("El objeto seleccionado no está disponible en la tienda.");
        return;
    }
    if (usuario.capacidadInventario < objeto.peso) {
        alert(
            "Recuerda que no solo debes pagarlo, también debes tener espacio en tu inventario para cargarlo."
        );
    } else if (usuario.balanceOro < objeto.precio) {
        alert("No tienes suficiente oro para comprar este objeto.");
    } else if (usuario.inventario.some((obj) => obj.id === objeto.id)) {
        alert("Ya tienes este objeto en tu inventario.");
    } else {
        usuario.balanceOro -= objeto.precio;
        usuario.capacidadInventario -= objeto.peso;
        usuario.inventario.push(objeto);
        alert(`Has comprado ${objeto.nombre} por ${objeto.precio} de Oro.`);
        // Borrar objeto de la tienda una vez que se ejecute la funcion con exito.
        const div = document.getElementById(objeto.id);
        div.remove();
        // Guardar estado actual del inventario a local storage
        guardarInventario(usuario)
        // Agregue la funcion mostrarInventario(), para que actualice al usuario sobre el contenido del inventario.
        mostrarInventario();
        // Agregue la funcion mostrarEstadisticas(), para que actualice las estadisticas del usuario.
        mostrarDatos()
    }
};

//////////////////////// Modo nocturno.  ////////////////////////
//Modo nocturno con localStorage.
const botonDark = document.getElementById("btnfondo");
const setDark = () => document.body.classList.toggle("dark");
botonDark.addEventListener("click", () => {
    setDark();
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("modo", "dark");
    } else {
        localStorage.setItem("modo", "light");
    }
});
//Guardo modo de seteado.
inicializarModoOscuro()
function inicializarModoOscuro() {
    const modo = localStorage.getItem("modo")
    console.log(modo)
    if (modo !== "light") {
        setDark()
    }
};