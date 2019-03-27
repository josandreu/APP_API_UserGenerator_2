// 1 - variables
const boton = $('#boton');
const contenido = $('#contenido');
const numero = $('#numero');
const numeroUsuarios = $('#numeroUsuarios');
const busqueda = $('#busqueda');
// aquí guardaremos los usuarios que devuelva la llamada ajax
let listadoUsuarios = [];
// creamos array para el uso de jQuery UI autocomplete 
let listadoNombres = [];

// 2 - funciones

// a esta función se llamará cada vez que se pulse una tecla en la barra de busqueda
const mostrarUsuarios = () => {
    // primero tenemos que saber los usuarios que coinciden con el patrón de búsqueda
    // aquí guardaremos las posiciones de los usuarios encontrados
    let indices = [];
    listadoNombres.forEach((usuario, index) => {
        // utilizamos método search (devuelve -1 si no encuentra)
        // si alguno de los usuarios es = que lo escrito en la barra de busqueda ...
        if (usuario.search(busqueda.val()) !== -1)
            // guardamos en el array indices el indice del elemento
            indices.push(index);
    });
    console.log(indices);


};

// https://randomuser.me/
const llamarAPI = (miUrl) => {
    // e.preventDefault();
    $.ajax({
        // url personalizada
        url: miUrl,
        dataType: 'json',
        success: function (data) {
            console.log(data.results);
            // guardamos el resultado en el array
            listadoUsuarios = data.results;
            // actualizamos el contenido del input readonly con la longitud del array
            numeroUsuarios.val(listadoUsuarios.length);
            // reiniciamos el array
            listadoNombres = [];
            // recorremos el array listadoUsuarios para rellenar el array listadoNombres
            listadoUsuarios.forEach(usuario => {
                // metemos el nombre y apellido de cada usuario
                listadoNombres.push(usuario.name.first + " " + usuario.name.last);
            });
            console.log(listadoNombres);
            // esta es la función de jQuery UI, la aplicamos sobre el input de busqueda
            $("#busqueda").autocomplete({
                source: listadoNombres
            });

        },
        error: function () {
            console.log("Ha habido un error en la consulta Ajax...");
        }
    });
};

const prepararUrl = (e) => {
    e.preventDefault();
    let miUrl;
    // atributo TARGET dentro del DOM, aunque no es necesario, lo dejamos
    if (e.target.id === 'boton') {
        // esta variable la cogemos del texto del input que indica el nº de usuarios
        let n = numero.val();
        // la pasamos por la url, para indicar el nº de resultados
        miUrl = 'https://randomuser.me/api/?nat=es&inc=gender,name,nat,picture&results=' + n;
    }
    llamarAPI(miUrl);

};

const inicializar = () => {
    // en el input readonly, indicamos el número de usuarios del array
    numeroUsuarios.val(listadoUsuarios.length);
};



// 3 - eventos

// equivalente a lo de arriba
boton.on('click', prepararUrl);
busqueda.on('keyup', mostrarUsuarios);
$(document).ready(function () {
    inicializar();
});