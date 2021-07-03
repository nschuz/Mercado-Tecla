class Carrito {
    constructor(usuario, productos) {
        this.id = this.generateId();
        this.usuario = usuario;
        this.productos = productos; //Array de Objetos Producto
        this.total = this.getTotal();
    }

    generateId() {
        return Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    }

    addProducto(newProduct) {
        this.productos.push(newProduct);
    }

    removeProducto(producto){
        let i = this.productos.indexOf(producto);
        this.productos.splice( i, 1 );
    }

    addCantidad(producto) { //Funcion que incrementa 1 a la cantidad de un elemento en el carrito
        let i = this.productos.indexOf(producto);
        productos[i].cantidad += 1;
    }

    subtractCantidad(producto){ //Funcion que disminuye 1 a la cantidad de un elemento en el carrito
        let i = this.productos.indexOf(producto);
        if (productos[i].cantidad == 1) { //Si es 0 elimina al elemento del carrito
            this.removeProducto(producto)
        } else {
            productos[i].cantidad -= 1;
        }
    }

    getTotal() {
        let total = 0;
        this.productos.forEach(e => {
            total += e.precio*e.cantidad;            
        });
        return total;
    }
}

let carrito =  new Carrito();
console.log(carrito);