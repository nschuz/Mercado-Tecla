import { Producto } from "./Producto.js";
import { pintarCarrito } from "./cart.js";

class Carrito {
    constructor(usuario, productos) {
        this.id = this.generateId();
        this.usuario = usuario;
        this.productos = productos; //Array de Objetos Producto
        this.total = this.getTotal();
    }

    /* Genera un Id Aleatorio */
    generateId() {
        return Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    }

    /* Intenta agregar un producto, si ya existe agrega 1 mas, en caso contrario lo agrega */
    addProducto(e, id, title, price, image) {
        let exist = false;
        let index;
        const producto = new Producto(id, title, price, 1, image);
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == producto.id) {
                index = i;
                exist = true;
            }
        }
        if (!exist)
            this.productos.push(producto)
        else
            this.productos[index].cantidad += 1;
        localStorage.setItem('productos', JSON.stringify(this.productos)); // Guardamos en la memoria local el producto agregado.
        window.location.replace('/tienda/carrito'); // Redirigimos a la pagina del carrito.
    }

    /* Incrementa 1 en la cantidad de cierto producto */
    addUnProducto(e, id) {
        for (let i = 0; i < this.productos.length; i++) {
            if (id === this.productos[i].id)
                this.productos[i].cantidad += 1;
        }
        localStorage.setItem('productos', JSON.stringify(this.productos)) // Guardamos en la memoria local la cantidad actualizada.
        pintarCarrito();
    }

    /* Decrementa 1 en la cantidad de cierto producto */
    dismunuyeUnProducto(e, id) {
        for (let i = 0; i < this.productos.length; i++) {
            if (id === this.productos[i].id) {
                if (this.productos[i].cantidad == 1) {
                    this.productos.splice(i, 1);
                } else {
                    this.productos[i].cantidad -= 1;
                }
            }
        }
        localStorage.setItem('productos', JSON.stringify(this.productos)) // Guardamos en la memoria local la cantidad actualizada.
        pintarCarrito();
    }

    /* Eliminamos por completo un producto */
    removeProducto(e, id) {
        for (let i = 0; i < this.productos.length; i++) {
            if (id === this.productos[i].id) {
                this.productos.splice(i, 1);
            }
        }
        localStorage.setItem('productos', JSON.stringify(this.productos))
        pintarCarrito();
    }

    getTotal() {
        let total = 0;
        this.productos.forEach(e => {
            total += e.precio * e.cantidad;
        });
        return total;
    }
}


/* Se crea la instancia de la clase carrito, tomando como productos los que hay guardados en memoria */
function creaCarrito() {
    let productos = [];
    if (localStorage.getItem('productos')) {
        productos = JSON.parse(localStorage.getItem('productos'));
    }
    return new Carrito('cliente', productos);
}

export const carrito = creaCarrito();