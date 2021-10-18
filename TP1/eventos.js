let temp;
function agregarbtn(){
    const nuevaTareaValor = document.getElementsByName("nuevatarea")[0].value;
    temp =nuevaTareaValor;
    const nuevaTareaNodo = document.createElement("li");
    nuevaTareaNodo.innerHTML = 
                    `   <input type="checkbox" name="" id="">
                        <p>${nuevaTareaValor}</p>
                        <button onclick="Copiartarea(this)"> <i class="fas fa-clipboard"></i> </button>
                        <button onclick= "Share(this)"> <i class="fas fa-share-alt"></i> </button>
                        <button onclick="this.parentElement.remove()"> <i class="fas fa-times-circle"></i> </button>
                    `;
    const listadoUl = document.querySelector("#listado");
    listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0]);
}
function Copiartarea(){
    if (navigator.clipboard != undefined){
        navigator.clipboard.writeText(temp)
        .then(
          () => alert("Tarea copiada"))
        .catch(err => console.error("Ups!", err));
    }
}
var icono = document.getElementById("full");
function Fullscreen (){
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
    function Share() {
        if (!("share" in navigator)) {
          alert("Su navegador no permite esta función");
          return;
        }
        navigator.share({
            title: temp,
            url: 'https://whatwebcando.today/'
          })
          .then(
              () => console.log('Compartida'))
          .catch(error => console.log('Error al compartir:', error));
      }