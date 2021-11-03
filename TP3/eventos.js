let valor;
let tarea= [];
let geo= null;
let root;
const listadoUl = document.querySelector("#listado");

//actualiza los valores
function update_storage(){
  sessionStorage.setItem('tarea',JSON.stringify(tarea));
}

//agrega una nueva tarea
function agregarbtn(){
    const id = tarea.length === 0 ? 0 : tarea[tarea.length -1].id + 1;
    valor = document.getElementsByName("nuevatarea")[0].value;
    const nuevaTareaNodo = document.createElement("li");
    nuevaTareaNodo.innerHTML = 
                    `   <input type="checkbox" name="check" onchange="check(this.parentElement)" ${tarea.done ? 'checked':''}> 
                        <p>${valor}</p>
                        <div id="buttons">
                        <button onclick="Copiartarea(this.closest('li'))"> <i class="fas fa-clipboard"></i> </button>
                        <button onclick= "Share(this)"> <i class="fas fa-share-alt"></i> </button>
                        <button onclick="clean(this.closest('li'), tarea)"> <i class="fas fa-times-circle"></i> </button>
                        </div>
                    `;
   listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0]); 
   nuevaTareaNodo.setAttribute("data-id", id);
   tarea.push({
       id: id,
       nombre: valor,
       done: false,
       geolocation: geo
   })
   update_storage();
}

//copia la tarea 
function Copiartarea(li){
  let texto =li.querySelector("p").textContent;
  console.log(texto)
    if (navigator.clipboard != undefined){
        navigator.clipboard.writeText(texto)
        .then(
          () => alert("Tarea copiada"))
        .catch(err => console.error("Error detectado", err));
    }
}

//Pantalla Completa
function Fullscreen (){
  var icono = document.getElementById("full");
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
            icono.innerHTML =  `<i class="fas fa-compress-arrows-alt"></i>`; 
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        icono.innerHTML = `<i class="fas fa-expand">`; 
      }
    }
}

//Comparte la tarea
function Share() {
  if (!("share" in navigator)) {
    alert("Su navegador no permite esta función");
    return;
  }
  navigator.share({
    title: valor,
    url: 'https://whatwebcando.today/'
  })
  .then(
    () => console.log('Compartida'))
  .catch(error => console.log('Error al compartir:', error));
}

//Elimina una tarea
function clean(li, tarea){
  const nuevoid = parseInt(li.getAttribute("data-id"));
  if (nuevoid != null){
    tarea.splice(nuevoid, 1);
    listadoUl.removeChild(li);
  }
  update_storage();
}

//Marca la tarea, realiza un cambio de estado
function check(li){
let id =li.getAttribute("data-id") 
/*let cb= document.getElementsByName("check");
if(cb.checked){
  cb.checked =true
}*/
tarea[id].done = tarea[id].done ? false :true 
update_storage();
}

//Función para determinar los colores de la app según el tema
function temas(){
  root = document.querySelector(":root");
  if(window.matchMedia){
    if(window.matchMedia('(prefers-color-scheme: dark )').matches){
      document.body.classList.add('dark')
      root.style.setProperty("--frente", "rgb(255,255,255)");
      root.style.setProperty("--fondo", "rgba(0,0,0)");
      root.style.setProperty("--aux1", "rgba(255,255,255,0.5)");
      root.style.setProperty("--aux2", "rgb(56,56,56)");
    }else{
      document.body.classList.add('light')
      root.style.setProperty("--frente", "rgba(0,0,0)");
      root.style.setProperty("--fondo", "rgb(255,255,255)");
      root.style.setProperty("--aux1", "rgba(34,34,34,0.5");
      root.style.setProperty("--aux2", "rgb(222, 225, 230)");
    }
  }else{
    console.log('no soportado ')
  } 
}

//Función de exito y función de error para geolocalización
function success(pos) {
    geo={lat: pos.coords.latitude, lon: pos.coords.longitude}
  };
function error(err) {
    console.warn('Error detectado(' + err.code + '): ' + err.message);
  };

//Carga los datos
window.onload = () => {
  temas()//llamada a la función temas

  //Geolocalización
  if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, error, tarea)
  }
  
  tarea = JSON.parse(sessionStorage.getItem("tarea")) || [];
  for (let i = 0; i < tarea.length; i++) {
    const nuevaTareaNodo = document.createElement("li");
    nuevaTareaNodo.innerHTML = 
         ` <input type="checkbox" name="check" onchange="check(this.parentElement)" ${tarea[i].done ? 'checked':''} >
           <p>${tarea[i].nombre}</p>
           <div id="buttons">
           <button onclick="Copiartarea(this.closest('li'))"> <i class="fas fa-clipboard"></i> </button>
           <button onclick= "Share(this)"> <i class="fas fa-share-alt"></i> </button>
           <button onclick= "clean(this.closest('li'), tarea)" name="eliminar"> <i class="fas fa-times-circle"></i> </button>
           </div>
         `;
    const listadoUl = document.querySelector("#listado");
    listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0]);
    nuevaTareaNodo.setAttribute("data-id", tarea[i].id);
      }
}
