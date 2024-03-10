const shopContent=document.getElementById("shopContent");
const productos=[
    {id:1, nombre:"Pistachos 300gr", cantidad:1, imagen: "https://images.pexels.com/photos/1799307/pexels-photo-1799307.jpeg?auto=compress&cs=tinysrgb&w=400", precio:8550},
    {id:2, nombre:"Nuez Mariposa 300gr", cantidad:1, imagen: "https://media.istockphoto.com/id/478097270/es/foto/pu%C3%B1ado-de-nueces-kernels.jpg?b=1&s=612x612&w=0&k=20&c=EAriN0ZAnrzKIrEzyigAzgqcOFsGHAqWTJW5jEUCjZY=", precio:8550},
    {id:3, nombre:"Avellanas 300gr", cantidad:1, imagen: "https://images.pexels.com/photos/14571824/pexels-photo-14571824.jpeg?auto=compress&cs=tinysrgb&w=400", precio:8550},
    {id:4, nombre:"Almendras 300gr", cantidad:1, imagen: "https://images.pexels.com/photos/4033325/pexels-photo-4033325.jpeg?auto=compress&cs=tinysrgb&w=400", precio:8550},
    {id:5, nombre:"Nuez Pecan 300gr", cantidad:1, imagen: "https://media.istockphoto.com/id/482483072/es/foto/pacana-tuercas-en-taz%C3%B3n-de-madera.jpg?b=1&s=612x612&w=0&k=20&c=avlnJt8xrhG487-QWHHlSKZd518JT--GLLB7oRWJjjM=", precio:8550},
    {id:6, nombre:"Mani 300gr", cantidad:1, imagen: "https://media.istockphoto.com/id/872635616/es/foto/man%C3%AD-tostado-aislado-en-blanco.jpg?s=612x612&w=0&k=20&c=Dwxad8qlh8ixGuOo7N4PAfZ2gOaKlyzbGfiTeQwyN6o=", precio:8550},
    {id:7, nombre:"Castañas de Caju 300gr", cantidad:1, imagen: "https://media.istockphoto.com/id/542710466/es/foto/anacardo-tuerca-sobre-un-fondo-blanco.jpg?s=612x612&w=0&k=20&c=PlTH7ePOq5iFOPcaRHuyuD7VQFqTTPWrEtgLNFQ_pAg=", precio:8550},
    {id:8, nombre:"Mix de semillas 300gr", cantidad:1, imagen: "https://media.istockphoto.com/id/1134339762/es/foto/mezcla-de-semillas-en-un-taz%C3%B3n-de-madera.jpg?b=1&s=612x612&w=0&k=20&c=8Asn_rxyJNdxdOsn2ud82-OWo6ZhKHTaCismlJsf_1M=", precio:8550},
    {id:9, nombre:"Semillas de zapallo 300 gr", cantidad: 1, imagen: "https://media.istockphoto.com/id/862745870/es/foto/mont%C3%B3n-de-primeros-planos-de-las-semillas-de-calabaza-como-fondo-abstracto-alimentos.jpg?s=612x612&w=0&k=20&c=GZZIUwlJoC_O3TmbeEXawDQ66HODSDjJ8dT21AWMVXQ=", precio:8550},
    {id:10, nombre:"Semillas de chía 300gr", cantidad:1, imagen: "https://images.pexels.com/photos/13613853/pexels-photo-13613853.jpeg?auto=compress&cs=tinysrgb&w=400", precio:8550},
    {id:11, nombre:"Semillas de girasol 300gr", cantidad:1, imagen: "https://images.pexels.com/photos/7421114/pexels-photo-7421114.jpeg?auto=compress&cs=tinysrgb&w=400", precio:800},
    {id:12, nombre:"Semillas de lino 300gr", cantidad:1, imagen: "https://images.pexels.com/photos/10916611/pexels-photo-10916611.jpeg?auto=compress&cs=tinysrgb&w=400", precio:600}
];

let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
const vercarrito=document.getElementById("verCarrito");
const modalContainer=document.getElementById("modal-container");
const cantidadCarrito=document.getElementById("cantidadCarrito");

productos.forEach((product)=>{
    let content=document.createElement("div");
    content.className= "card"
    content.innerHTML=`<div class="card" style="width: 18rem; margin-top:10px">
    <img src="${product.imagen}" class="card-img-top" alt="imagen producto">
    <div class="card-body">
      <h5 class="card-title">${product.nombre}</h5>
      <p class="price">$${product.precio}</p>
    </div>
  </div>`;
    
    shopContent.append(content);

    let comprar= document.createElement("button");
    comprar.innerText= "Agregar";
    comprar.className="Agregar"

    content.append(comprar);

    comprar.addEventListener("click", ()=>{

const repeat = carrito.some((repeatproduct)=> repeatproduct.id === product.id);

if(repeat){
    carrito.map((prod)=>{
        if(prod.id === product.id){
            prod.cantidad++
        };
    });
}else{
        carrito.push({
            id: product.id,
            imagen : product.imagen,
            nombre: product.nombre,
            cantidad: product.cantidad,
            precio: product.precio,
        });
    };
        console.log(carrito);
        carritoCounter();
        saveLocal();
    });
});


const addCarrito=()=>{
    modalContainer.innerHTML="";
    modalContainer.style.display="flex";
    const modalHeader = document.createElement("div");
    modalHeader.className= "modal-header";
    modalHeader.innerHTML=`
        <h1 class="modal-header-title">Carrito</h1>
    `;

    modalContainer.append(modalHeader);

    const modalButton= document.createElement("h1");
    modalButton.innerText="X";
    modalButton.className="modal-header-button";

    modalButton.addEventListener("click", ()=>{
        modalContainer.style.display= "none";
    });

    modalHeader.append(modalButton);
    
    carrito.forEach((product)=>{
    let carritoContent= document.createElement("div");
    carritoContent.className="modal-content";
    carritoContent.innerHTML= `
    <img src="${product.imagen}">
    <h3>${product.nombre}</h3>
    <p>$${product.precio}</p>
    <span class="restar"> - </span>
    <p>Cantidad: ${product.cantidad}</p>
    <span class="sumar"> + </span>
    <p>Total: $${product.cantidad*product.precio}</p>
    `;

    modalContainer.append(carritoContent);

    let restar= carritoContent.querySelector(".restar");
    restar.addEventListener("click", ()=>{
        if(product.cantidad!== 1){
        product.cantidad --;
        };
        addCarrito();
    });

    let sumar= carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", ()=>{
        product.cantidad ++;
        saveLocal();
        addCarrito();
    });

    // console.log(carrito.length);

    let eliminar=document.createElement("span");
    eliminar.innerText="Eliminar";
    eliminar.className="delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
    });



    const total = carrito.reduce((acc, el)=> acc + el.precio * el.cantidad, 0);

    const totalCompra=document.createElement("div");
    totalCompra.className="total-content";
    totalCompra.innerHTML= `total a pagar: $${total}`;
    modalContainer.append(totalCompra);

};


vercarrito.addEventListener("click", addCarrito);

const eliminarProducto= ()=>{
    const foundId=carrito.find((element)=>element.id);

    carrito= carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    addCarrito();
};


const carritoCounter= ()=>{
    cantidadCarrito.style.display="block";
    const carritoLenght=carrito.length;
    localStorage.setItem("carritoLengtht", JSON.stringify(carritoLenght));
    cantidadCarrito.innerText=JSON.parse(localStorage.getItem("carritoLenght"));
}

const saveLocal=()=>{
localStorage.setItem("carrito",JSON.stringify (carrito));
}

carritoCounter();


function calificaciones(){
fetch ("https://jsonplaceholder.typicode.com/posts/1/comments")
.then(respuesta=> respuesta.json())
.then (data=>{
    let gente="";
    for(const post of data){
        gente +=`
        <div class="card text-bg-success mb-3" style="max-width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${post.titulo}</h5>
          <p class="card-text">${post.body}</p>
        </div>
      </div>
      `
    }

    document.getElementById("comentarios").innerHTML= gente;
})
}
calificaciones();


function suscribirForm(){
    Swal.fire({
        title:'Tu suscripción ha sido exitosa',
        icon:'success',
        confirmButtonText:'Cerrar'
    });
    return false;
}