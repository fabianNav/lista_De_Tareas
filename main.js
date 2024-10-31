import './css/style.css'
import Swal from 'sweetalert2'

//TODO MODO OSCURO
const colorPredeterminado = window.matchMedia('(prefers-color-scheme: noche)').matches ? 'noche' : 'dia';
const slider = document.getElementById('slider');
const setTema = (tema) => {
  document.documentElement.setAttribute('data-theme', tema);
  localStorage.setItem('tema', tema);
}
slider.addEventListener('click', () => {
  let cambiarTema = localStorage.getItem('tema') === 'noche' ? 'dia' : 'noche';
  setTema(cambiarTema);
})
setTema(localStorage.getItem('tema') || colorPredeterminado);





//TODO Agregar tarea a lista
const agregar = document.getElementById('agregarTarea');
agregar.addEventListener('click', () => {
  crearTarea('');
})

//TODO Editar tarea
const lista = document.getElementById('lista');
lista.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {    //*  event.keycode == 13 hace alucion a presionar la tecla que tenga tal codigo asignado, en este caso la tecla enter tiene el numero 13  https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode


    editarTarea(event.composedPath()[1].id, event.composedPath()[0].value);   //* composedPath() devuelve la ruta del evento, que es una matriz de objetos en los que se invocarán los oyentes.   https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath

  }
})

//TODO Eliminar tarea
lista.addEventListener('click', (event) => {
  if (event.composedPath()[0].type == 'submit') {
    eliminarTarea(event.composedPath()[1].id)
  }
})




//TODO Limpiar toda la lista de tareas
const limpiarTodo = document.getElementById('botonLimpiarTodo');
limpiarTodo.addEventListener('click', () => {
  limpiar();
})

//TODO LocalStorage
let arregloTareas = [];
let contador = 0;

//! Crea un contador en el LS
const setContador = () => {
  localStorage.setItem('contador', contador);
}

//! Lee el contador del LS
const getContador = () => {
  const cont = localStorage.getItem('contador');
  return cont;
}

//! Inicia el contador apenas se cargue la página
const inicilizarContador = () => {
  if (getContador() != null) {
    contador = getContador()
  }
}

//! Crea el arreglo de tareas para agregar las tareas al LS
const setTareas = () => {
  localStorage.setItem('arregloTareas', JSON.stringify(arregloTareas));
  listarTareas();
}

//! Lee el arreglo de tareas que está en el LS
const getTareas = () => {
  setContador()
  const tareas = JSON.parse(localStorage.getItem('arregloTareas'));
  return tareas;
}

//! Crea y agrega la tarea en el arreglo de tareas del LS
const crearTarea = (descripcion) => {
  ++contador
  let objTarea = {
    id: contador,
    descripcion: descripcion
  }
  if (getTareas() != null) {
    arregloTareas = getTareas();
  }
  arregloTareas.push(objTarea);
  setTareas();
}

//! Ingresa la tarea en el DOM
const listarTareas = () => {
  lista.innerHTML = '';
  let datos = getTareas();
  if (datos != null) {
    for (const tarea of datos.reverse()) {
      lista.innerHTML += `
    <li id="${tarea.id}">
    <input type="text" class="inputTarea" value="${tarea.descripcion}">
    <button class="eliminar">x</button>
  </li>
  `;
    }
  } else {
    lista.innerHTML = `
                        <div class="aviso">
                          <h1>No hay datossss</h1>
                        </div>
                      `
  }
}

//! Edita la tarea seleccionada
const editarTarea = (idTarea, descripcion) => {
  let nuevaTarea = {
    id: idTarea,
    descripcion: descripcion
  }
  let datos = getTareas();
  let newArreglo = [];
  if (datos != null) {
    for (const tarea of datos) {
      if (tarea.id == idTarea) {
        newArreglo.push(nuevaTarea)
      } else {
        newArreglo.push(tarea)
      }
    }
  }
  arregloTareas = newArreglo;
  setTareas();
}

//! Elimina la tarea seleccionada
const eliminarTarea = (idTarea) => {
  let datos = getTareas();
  let newArreglo = [];
  if (datos != null) {
    for (const tarea of datos) {
      if (tarea.id != idTarea) {
        newArreglo.push(tarea);
      }
    }
  }
  arregloTareas = newArreglo;
  setTareas();
}

//! Elimina todas las tareas
const limpiar = () => {
  arregloTareas = [];
  contador = 0;
  setTareas();
  setContador();
}

//TODO Eventos especiales
let fecha = new Date();
let dia = fecha.getDate();
let mes = fecha.getMonth() + 1;
const cuerpo = document.body;
let audioSection = document.getElementById('audio');
//? NAVIDAD


if (dia == 25 || dia == 24 && mes == 12) {
  cuerpo.classList.add('navidad');
  document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
      imageUrl: "/public/christmasPopUp.png",
      imageHeight: 500,
      imageAlt: "Navidad",
      title: 'FELIZ NAVIDAD'
    });
    audioSection.innerHTML = 
    `
      <audio id="musical" loop controls>
        <source src="audio/navidadAudio.mp3" type="audio/mp3">
      </audio>
    `
    let musical = document.getElementById('musical');
    musical.play();
  })
} else if (dia !== 24 || dia !== 25 && mes !== 12) {
  cuerpo.classList.remove('navidad');
};

//? HALLOWEEN
if (dia == 31 && mes == 10) {
  cuerpo.classList.add('halloween');
  document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
      imageUrl: "/public/halloweenPopUp.png",
      imageHeight: 500,
      imageAlt: "Halloween",
      title: 'FELIZ HALLOWEEN'
    });
    audioSection.innerHTML = 
    `
      <audio id="musical" loop controls>
        <source src="audio/halloweenAudio.mp3" type="audio/mp3">
      </audio>
    `
    let musical = document.getElementById('musical');
    musical.play();
  })
} else if (dia !== 24 || dia !== 25 && mes !== 12) {
  cuerpo.classList.remove('halloween');
};



inicilizarContador()
listarTareas();




