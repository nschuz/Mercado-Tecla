class Producto{
    constructor (nombre, precio, cantidad) {
        this.id = this.generateId();
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    generateId() {
        return Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    }
}