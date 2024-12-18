// import { PgEvent } from '../../pgEvent.js';


export function validateState() {    
    let success = false;
    let message = "Hay mejoras por realizar."
    let reasons = [];

    const objetosTecno = ["Computadora", "Celular"]
    const objetosNoTecno = ["Lápiz", "Cuaderno"]

    const categoriaTecno = document.querySelectorAll(".dropzone")[0].children
    const categoriaNoTecno = document.querySelectorAll(".dropzone")[1].children
    
    // console.log(categoriaTecno);
    // console.log(categoriaNoTecno);
    if (categoriaTecno.length == 0 && categoriaNoTecno.length == 0) {
        reasons.push("Ambas categorías están vacías. Arrastra los objetos a cada caja.")
    } else {
        if (categoriaTecno.length == 0 ) {
            reasons.push('La categoría \"Objetos tecnológicos\" está vacía.')
        }else if (categoriaNoTecno.length == 0 ) {
            reasons.push('La categoría \"Objetos No tecnológicos\" está vacía.')
        } else { 
            for (let i = 0; i < categoriaTecno.length; i++) { 
                let encontrado = objetosTecno.find(o => o == categoriaTecno[i].textContent)
                // console.log(categoriaTecno[i].textContent);
                if (!encontrado) {
                    reasons.push(categoriaTecno[i].textContent + " está en la categoría incorrecta.");
                }
                
            }
        
            for (let i = 0; i < categoriaNoTecno.length; i++) {
                let encontrado = objetosNoTecno.find(o => o == categoriaNoTecno[i].textContent)
                if (!encontrado) {
                    reasons.push(categoriaNoTecno[i].textContent + " está en la categoría incorrecta.");
                }
                
            }
        }
        const items = document.querySelectorAll("#items-container .item")
        if (reasons.length == 0 && items.length == 0) {
            success = true
            message = "¡Buen trabajo!"
        }
    }

    
    // console.log(success, reasons);
    
    return { success, reasons, message };
  }