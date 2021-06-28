class Cliente {
    constructor(nombre, apPaterno, apMaterno, direccion, telefono, email) {
        this.id = this.generateId();
        this.nombre = nombre;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
    }
    
    generateId() {
        return Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    }
}