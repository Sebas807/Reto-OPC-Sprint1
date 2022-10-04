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
        datable.innerHTML = `<p> Aún no hay eventos disponibles </p>`;
    }
}

window.addEventListener("load", start, false);
