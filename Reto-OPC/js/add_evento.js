//JavaScript Document

//Para que IndexedDB funcione en todos los navegadores
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB;

function start() {
    document.getElementById("btn_can").onclick = function(){
        window.open('../html/gestion_eventos.html','_top')
    }
    btnAdd = document.getElementById("btn_add");
	btnAdd.addEventListener("click", Add_user, false);
    //Crear Base de Datos
    let request = indexedDB.open("DB_1");
    //Verificar la creación de la base de datos
    request.onsuccess = function (e) {
        //Guardamos la base de datos en una variable (bd)
        bd = e.target.result;
        //Registrar();
    }
}

function Add_user(){
    let name = document.getElementById("name").value
    let id = document.getElementById("id").value
    let capacidad = document.getElementById("salary").value
    let fecha_hora = document.getElementById("position").value
    let duracion = document.getElementById("email").value
    //Agregamos al almacén de datos los objetos (registros)
    var transaction = bd.transaction(["users"], "readwrite");
    //Almacenamos en la variable almacen la transacción
    var store = transaction.objectStore("users");
    //Agregamos los datos del registro a los "campos"
    var add = store.add({id: id, name: name, salary:capacidad,
    email:duracion,position:fecha_hora});
    alert("Evento Registrado")
}

window.addEventListener("load", start, false);