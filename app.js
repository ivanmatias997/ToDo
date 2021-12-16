const formulario = document.getElementById("formulario");
const template = document.getElementById("template").content;
const listaTareas = document.getElementById("listaTareas");
const fragment = document.createDocumentFragment();
let tareas = {};


document.addEventListener("DOMContentLoaded",() => {
  pintarTarea()
})

formulario.addEventListener("submit",(e) => {
  e.preventDefault();
 
  agregarTarea(e);
  pintarTarea();
  
})

listaTareas.addEventListener("click",(e) => {
  
  btnEvento(e)
})




const agregarTarea = (e) => {//creamos un objeto temporal y se lo agragamos a tareas
 // ademas comprobamos que no este vacio, si lo esta se lo avisamos al usuario
 if(!e.target[0].value.trim()){
   console.log("esta vacio")
   listavacia = listaTareas
   listavacia.innerHTML = `<div class="alert alert-danger text-center"></div>`
   return
}

var toDo={
  tarea : e.target[0].value,
  id : Date.now(),
  estado : false,
}

  tareas[toDo.id] = toDo;
  formulario.reset()
  formulario.querySelector("input").focus()
}

const pintarTarea = () => {
  listaTareas.textContent=""
  if(Object.values(tareas).length===0){
    listaTareas.innerHTML=`
    <div class="alert alert-dark mt-3 text-center">No hay tareas pendientes!</div>
    `
    return
  }



  listaTareas.textContent = "";
  Object.values(tareas).forEach( (obj) => {
    clone=template.cloneNode(true);
    clone.querySelector("p").textContent = obj.tarea;

    if(obj.estado){
      clone.querySelector(".alert").classList.replace("alert-warning","alert-primary")
      clone.querySelectorAll(".fas")[0].classList.replace("fa-check-circle","fa-redo-alt")
      clone.querySelector("p").style.textDecoration = "line-through"
    }

    clone.querySelectorAll(".fas")[0].dataset.id = obj.id;
    clone.querySelectorAll(".fas")[1].dataset.id = obj.id;
    fragment.appendChild(clone)
  })
  listaTareas.appendChild(fragment)
}

const btnEvento = (e) => {
  if(e.target.classList.contains("fa-check-circle")){
    tareas[e.target.dataset.id].estado = true;
    pintarTarea();
  }
  if(e.target.classList.contains("fa-minus-circle")){
    delete tareas[e.target.dataset.id];
    pintarTarea();
  }
  if(e.target.classList.contains("fa-redo-alt")){
    tareas[e.target.dataset.id].estado = false;
    pintarTarea()
  }
  e.stopPropagation()
}
