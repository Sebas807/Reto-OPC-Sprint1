//JavaScript Document

//Para que IndexedDB funcione en todos los navegadores
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB;
//Definimos las variables generales del Programa
let bd;
let result;
let cursor;
let datable;

function start() {
    document.getElementById("btn_log").onclick = function(){
        alert("Sesión cerrada");
    }
    btnAdd = document.getElementById("btn_add")
	btnAdd.addEventListener("click", Redirect_Add, false)
    //Crear Base de Datos
    let request = indexedDB.open("DB_1");
    //Verificar la creación de la base de datos
    request.onsuccess = function (e) {
        //Guardamos la base de datos en una variable (bd)
        bd = e.target.result;
        //Registrar();
        Load_Users();
    }
}

function Registrar(){
    //alert("Registrar usuario")
    //Función para agregar el admin a la BD
    //Recuperamos y Guardamos en variable los campos del formulario
    let name = "Bailes típicos de Colombia"
    let id = "01"
    let capacidad = 20
    let fecha_hora = "04/10/2022-9:30 a.m"
    let duracion=2
    //Agregamos al almacén de datos los objetos (registros)
    var transaction = bd.transaction(["users"], "readwrite");
    //Almacenamos en la variable almacen la transacción
    var store = transaction.objectStore("users");
    //Agregamos los datos del registro a los "campos"
    var agregar = store.add({id: id, name: name, salary:capacidad,
        email:duracion,position:fecha_hora});
    //Si agregar el objeto (registro) es exitoso, se ejecuta --> mostrar 
    //alert("Usuario registrado.")
}

function Load_Users() {
    datable = document.getElementById("user_table")
    count = 1;
    datable.innerHTML = "";//Incrusta código HTML
    //alert(bd)
    var transaction = bd.transaction(["users"], "readonly");
    var store = transaction.objectStore("users");
    var cursor = store.openCursor();
    //Si tiene éxito al abrir el cursor . . .
    cursor.addEventListener("success", UserTable, false);
}

function UserTable(e) {
    var cursor = e.target.result;
    //Si el cursor está abierto
    if (cursor) {
        datable.innerHTML += `
			<table class="hover">
				<tr>
					<th class="id_info">
                        <input type="text" placeholder="User `+ count + `" value="` + cursor.value.id + `" id="id` + count + `" readonly> 
					    <input type="text" placeholder="User `+ count + `" value="` + cursor.value.name + `" id="name` + count + `" readonly> 
					    <input type="text" placeholder="User `+ count + `" value="` + cursor.value.position + `" id="position` + count + `" readonly> 
                        <input type="text" placeholder="User `+ count + `" value="` + cursor.value.salary + `" id="salary` + count + `" readonly> 
                        <input type="text" placeholder="User `+ count + `" value="` + cursor.value.email + `" id="email` + count + `" readonly> 
					</th>
				</tr>
			</table>
			<div class ="div_info" id="vision`+ count + `"></div>
			<br> `
        cursor.continue();
        count = count + 1;
    }
    if (count == 1) {
        datable.innerHTML = `<p> Aún no tienes eventos registrados </p>`;
    }
}

function Redirect_Add(){
    window.open('../html/add_evento.html','_top')
}

window.addEventListener("load", start, false);
