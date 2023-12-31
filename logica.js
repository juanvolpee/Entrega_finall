console.table(productos);
//si quedo un carro abandonado lo recupero y lo guardo en el array, sino inicializo el array vacio
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let contenedor = document.getElementById("misprods");
let cantidad = document.getElementById('cantidad');
cantidad.innerText = `🛒${carrito.length}`;



//primer renderizado
if (carrito.length != 0) {
    for (const prod of carrito) {
        //agregar fila a la tabla de carrito
        document.getElementById('tablabody').innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td><button class='btn btn-light'>🗑️</button></td>
            </tr>
        `;
    }
    //incrementar el total
    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    document.getElementById('total').innerText = 'Total a pagar $: ' + totalCarrito;
}




/*const DateTime = luxon.DateTime;
const inicio = DateTime.now();
console.log(inicio.toLocaleString());
console.log(inicio.weekdayLong);
Swal.fire(`Que tengas un hermoso día ${inicio.weekdayLong}`);
console.log(inicio.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS));*/
const DateTime = luxon.DateTime;
const inicio = DateTime.now();
swal.fire(`Recuerda que debes ser mayor de 18 años para continuar`)






function renderizarProductos(productos) {
    contenedor.innerHTML = '';
    for (const producto of productos) {
        contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id='btn${producto.id}' class="btn btn-primary align-bottom">Comprar</button>
                </div>
            </div>   
        `;
    }

    
    productos.forEach((producto) => {
        document.getElementById(`btn${producto.id}`).addEventListener('click', () => {
            agregarACarrito(producto);
        });
    });
}

renderizarProductos(productos);

function agregarACarrito(prodAAgregar) {
    carrito.push(prodAAgregar);
    cantidad.innerText = `🛒${carrito.length}`;
    console.table(carrito);
    

   
    Swal.fire({
        title: 'Bien hecho!',
        text: `Agregaste ${prodAAgregar.nombre} al carrito`,
        imageUrl: prodAAgregar.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: prodAAgregar.nombre,
    })

    
    document.getElementById('tablabody').innerHTML += `
        <tr>
            <td>${prodAAgregar.id}</td>
            <td>${prodAAgregar.nombre}</td>
            <td>${prodAAgregar.precio}</td>
            <td><button class='btn btn-light'>🗑️</button></td>
        </tr>
    `;
    //incrementar el total
    let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    document.getElementById('total').innerText = 'Total a pagar $: ' + totalCarrito;
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}





//finalizar compra
let finalizarBtn = document.getElementById('finalizar');
finalizarBtn.onclick = () => {
   
    Toastify({
        text: "Gracias por tu compra! Recibirás el pedido en la brevedad.",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        close: true,
        style: {
            background: "linear-gradient(to right, #d40000, #7a7a7a)",
        },
        offset: {
            x: 150, 
            y: 110 
        },
    }).showToast();
    //vaciar el carro y la tabla
    carrito = [];
    document.getElementById('tablabody').innerHTML = ''
    cantidad.innerText = `🛒${carrito.length}`;
    document.getElementById('total').innerText = 'Total a pagar $: ';
    localStorage.removeItem('carrito');
    //luxon
    const fin = DateTime.now();
    const Interval = luxon.Interval;
    const tiempoParaComprar = Interval.fromDateTimes(inicio, fin);
    console.log("Tiempo de compra: "+tiempoParaComprar.length('seconds'));
   
    console.log(inicio.toLocaleString());
    console.log(inicio.weekdayLong);
    Swal.fire(`Que tengas un hermoso día ${inicio.weekdayLong}`);
    console.log(inicio.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS));
}

//enviar formulario
let enviarBtn = document.getElementById('datos');
var data=[]
//const formu=document.querySelector("formulario")
function agregar(){
    var nombre=document.getElementById("name").value;
    var edad=parseInt(document.getElementById("edad").value);
    var correo=document.getElementById("mail").value;
    var domicilio=document.getElementById("direccion").value;

        //agregar al arreglo
        data.push(
            {
                "nombre":nombre,
                "edad":edad,
                "correo electronico":correo,
                "domicilio":domicilio
            }
        )
        console.table(data)
    }

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

}

enviarBtn.onclick = () => {
    agregar()
    Toastify({
        text: "datos enviados",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        close: true,
        style: {
            background: "linear-gradient(to right, #d40000, #7a7a7a)",
        },
        offset: {
            x: 150, 
            y: 110 
        },
    }).showToast()
    
    
}
