// class Producto {
//     constructor (id, nombre, precio, img){
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.img = img;
//         this.cantidad = 1;
//     }

// }

// // Labiales
// const labial1 = new Producto("labial1", "Labial Anastasia BH", 250000, "./img/labial-anastasia.jpg"); 
// const labial2 = new Producto("labial2", "Labial Chanel", 415000, "./img/labial-chanel.jpg");
// const labial3 = new Producto("labial3", "Labial Dior", 467000, "./img/labial-dior.jpg");
// const labial4 = new Producto("labial4", "Labial Givenchy", 515000, "./img/labial-givenchy.jpg");

// // Sombras de ojos
// const sombras1 = new Producto("sombras1", "Sombras Tarte", 270000, "./img/sombras tarte.jpg");
// const sombras2 = new Producto("sombras2", "Sombras Naked", 245000, "./img/sombras-naked.jpg");
// const sombras3 = new Producto("sombras3", "Sombras Nars", 315000, "./img/sombras-nars.jpg");
// const sombras4 = new Producto("sombras4", "Sombras Norvina", 325000, "./img/sombras-norvina.jpg");

// // Pestañinas
// const pestanina1 = new Producto("pestanina1", "Pestaniña Dior", 410000, "./img/pestanina-dior.jpg");
// const pestanina2 = new Producto("pestanina2", "Pestaniña Estee Lauder", 425000, "./img/pestanina-lauder.jpg");
// const pestanina3 = new Producto("pestanina3", "Pestaniña Mac ", 330000, "./img/pestanina-mac.jpg");
// const pestanina4 = new Producto("pestanina4", "Pestaniña YSL", 405000, "./img/pestanina-ysl.jpg");

// const arrayProductos = [labial1, labial2, labial3, labial4, sombras1, sombras2, sombras3, sombras4, pestanina1, pestanina2, pestanina3, pestanina4];

// console.log(arrayProductos);

let productos = [];
let carritoCompras = [];
carritoCompras = JSON.parse(localStorage.getItem("carritoCompras")) || [];
const urlLocal = "../productos.json";

fetch(urlLocal)
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(data);
})
.catch(error => console.log(error));

const productosContenedor = document.getElementById("productosContenedor");


function cargarProductos(productos){
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class="card text-center" >
                            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}" >
                            <div>
                                <h3> ${producto.nombre} </h3>
                                <p> Precio: $ ${producto.precio} </p>
                                <button class="btn botonColor" id="botonComprar${producto.id}" >Comprar</button>
                            </div>
                        </div>
                        `;

        productosContenedor.appendChild(card);


        const botonComprar = document.getElementById(`botonComprar${producto.id}`);
        botonComprar.addEventListener("click", () => {
        agregarAlCarrito(producto.id);

        Toastify({
            text: "¡Producto agregado al carrito!",
            duration: 3000,
            gravity:"top",
            position: "right",
            style :{
                background: "linear-gradient(to right, #cebacf, #cf7fd3)",
                color : "black"
            }
            }).showToast();
        });
    });
};


const agregarAlCarrito = (id) => {
    const carritoProductos = carritoCompras.find((producto) => producto.id === id);
    if (carritoProductos) {
        carritoProductos.cantidad++;
    } else {
        const producto = arrayProductos.find((producto) => producto.id === id);
        carritoCompras.push(producto);
    }
    calcularTotal();
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
};

const carritoContenedor = document.getElementById("carritoContenedor");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarro();
})

const mostrarCarro = () => {
    carritoContenedor.innerHTML = "";
    carritoCompras.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class="card text-center" >
                            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}" >
                            <div>
                                <h3> ${producto.nombre} </h3>
                                <p> Precio: $ ${producto.precio} </p>
                                <p> Cantidad: ${producto.cantidad} </p>
                                <button class="btn botonColor" id="botonAgregar${producto.id}" >+</button>
                                <button class="btn botonColor" id="botonRestar${producto.id}" >-</button>
                                <button class="btn botonColor" id="botonEliminar${producto.id}" >Eliminar</button>
                            </div>
                        </div>
                        `;

        carritoContenedor.appendChild(card);

        const botonSumar = document.getElementById(`botonAgregar${producto.id}`);
        botonSumar.addEventListener("click", () => {
            agregarProducto(producto.id);
        });

        const botonDisminuir = document.getElementById(`botonRestar${producto.id}`);
        botonDisminuir.addEventListener("click", () => {
            restarProducto(producto.id);
        });

        const borrarProducto = document.getElementById(`botonEliminar${producto.id}`);
        borrarProducto.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });
    });
    calcularTotal();
};


const agregarProducto = (id) => {
    const producto = carritoCompras.find((producto) => producto.id === id);
    producto.cantidad++;
    mostrarCarro();
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
};

const restarProducto = (id) => {
    const producto = carritoCompras.find((producto) => producto.id === id);
    const indice = carritoCompras.indexOf(producto);
    producto.cantidad === 1 ? carritoCompras.splice(indice, 1) : producto.cantidad--;
    mostrarCarro();

    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
};

const eliminarProducto = (id) => {
    const producto = carritoCompras.find((producto) => producto.id === id);
    producto.cantidad = 1;
    const indice = carritoCompras.indexOf(producto);
    carritoCompras.splice(indice, 1);
    mostrarCarro();

    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
};


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carritoCompras.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
};

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    vaciarTodoElCarrito();

    Toastify({
        text: "¡Carrito vacío!",
        duration: 3000,
        gravity:"top",
        position: "right",
        style :{
            background: "linear-gradient(to right, #cebacf, #cf7fd3)",
            color : "black"
        }
        }).showToast();
});

const vaciarTodoElCarrito = () => {
    carritoCompras = [];
    mostrarCarro();

    localStorage.clear();
};

const finalizarCompra = document.getElementById("finalizarCompra");
finalizarCompra.addEventListener("click", () => {
    let totalCompra = 0;
    carritoCompras.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
});
    totalCompra > 0
    ? Swal.fire({
        title: "¡Compra exitosa!",
        text: "El valor total de tu compra es de $" + totalCompra,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(206, 186, 207)",
    })
    : Swal.fire({
        title: "¡Error en la compra!",
        text: "Esta acción no puede ser ejecutada, para finalizar la compra debe agregar algún producto al carrito.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(206, 186, 207)",
    });
    vaciarTodoElCarrito();
});
