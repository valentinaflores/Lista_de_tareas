function agregarbtn(){
    const nuevaTareaValor = document.getElementsByName("nuevatarea")[0].value;
    const nuevaTareaNodo = document.createElement("li");
    nuevaTareaNodo.innerHTML = 
                    `   <input type="checkbox" name="" id="">
                        <p>${nuevaTareaValor}</p>
                        <button onclick="this.parentElement.remove()"> x </button>
                    `;
    const listadoUl = document.querySelector("#listado");
    listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0]);
    
}
