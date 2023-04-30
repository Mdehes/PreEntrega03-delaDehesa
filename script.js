//Simulador de Tienda MMORPG.
//Aplique DOM para mostrar los elementos de forma dinamica en el documento HTML.
header.innerText = "";//En el header me gustaria agregar un nav, que muestre los datos del usuario (nombre del usuario, nivel, balance de oro y espacio del inventario).
titulo.innerText = "Tienda de las Rarezas";
bienvenidaUsuario.innerText =
"Bienvenido a la Tienda de las Rarezas!\nDime tu nombre aventurero..";
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
    (this.capacidadInventario = 60),
    (this.balanceOro = 200);
}
}
const usuario = new Usuario("NombreUsuario");
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
}
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
//Cree el array objetos[].
);
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
div.id = objeto.id
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
}if (usuario.capacidadInventario < objeto.peso) {
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
	const div = document.getElementById(objeto.id)
	div.remove()
}
}
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


