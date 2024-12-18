import '/style.css';
import { PgEvent } from '/src/pgEvent';
import { save } from '/src/utils/funtions.js'
import { validateState } from './test'; // Importamos funciones de test.js

const pgEvent = new PgEvent();
window.onload = pgEvent.getValues();
// console.log(pgEvent.getValues());


const items = document.querySelectorAll('.item');
const dropzones = document.querySelectorAll('.dropzone');
const validateBtn = document.getElementById('validate-btn');

document.addEventListener("DOMContentLoaded", () => {  
    // Habilitamos el dragstart para cada item
    items.forEach(item => {
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
      });
    });
  
    // Permitimos que las dropzones acepten los elementos arrastrables
    dropzones.forEach(dropzone => {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("highlight");
      });
  
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("highlight");
      });
  
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text");
        const item = document.getElementById(itemId);
        dropzone.appendChild(item);
        dropzone.classList.remove("highlight");

      });
    });
});

let estadoInicial = '{"cosasGuardadas":{"itemsLeft":["computadora","lapiz","celular","cuaderno"],"categoriaTecnoLeft":{},"categoriaNoTecnoLeft":{}}}'
let precarga = estadoInicial;
window.addEventListener('message', function (event) {
    if (isValidInitialEvent(event)) {
        console.log(event);
        
        precarga = validateJson(event.data.data) ? event.data.data : estadoInicial;
        let objNuevo = JSON.parse(event.data?.data).data=="not-started" ? estadoInicial:precarga
        // console.log(objNuevo);
        
      
    } else {
      console.log("no escucha message desde PG")
    }
  
});
  
  const isValidInitialEvent = (event) => {
    return event?.data?.data && event?.data?.type === 'init'
      && typeof event.data.data == "string"
  }
  
  const validateJson = (json) => {
    try {
      return !!JSON.parse(json)
    } catch (error) {
      console.error("Invalid provided json:", error.message)
      return null
    }
  }
  
  
validateBtn.addEventListener("click", () => {
    let validationResult = validateState();
    console.log(validationResult);
    
    let event = validationResult.success ? "SUCCESS" : "FAILURE";
    
    // console.log(event);
    
    let cosasGuardadas = save()
    console.log(cosasGuardadas);
    pgEvent.postToPg({
        event: event,
        message: validationResult.message,
        reasons: validationResult.reasons,
        state: JSON.stringify({
            cosasGuardadas
        })
    });
    
  });
  