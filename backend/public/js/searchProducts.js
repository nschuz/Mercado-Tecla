 class Busqueda {


     constructor(producto) {
         this.producto = producto;
         this.search = document.querySelector('#search-input');
         this.btn = document.querySelector('#search-btn');
         this.datos = '';
         //window.location.href = "http://localhost:8080/tienda/tienda";
     }

     hola() {
         console.log("hola desde la clase");
     }

     getValor() {
         this.btn.addEventListener('click', (e) => {
             e.preventDefault();
             console.log("hola");
             this.producto = this.search.value;
             this.consultarAPI(this.producto)
         });
     }


     async consultarAPI(producto) {
         this.producto = this.search.value;
         const response = await fetch(`https://teclanode.azurewebsites.net/api/productos/${this.producto}`);
         const productos = await response.json();
         console.log(productos);
         return productos;
     }


 }


 export { Busqueda };