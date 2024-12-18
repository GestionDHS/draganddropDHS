export function save() {
    const items = document.querySelectorAll("#items-container")[0].children
    // console.log(items);
    let itemsLeft = []
    for (const i of items) {
        itemsLeft.push(i.id)
    }    
    const categoriaTecno = document.querySelectorAll("#tecnologico")[0].children ? document.querySelectorAll("#tecnologico")[0].children : []
    let categoriaTecnoLeft = []
    for (const c of categoriaTecno) {
        categoriaTecnoLeft.push(c.id)
    }  

    const categoriaNoTecno = document.querySelectorAll("#no-tecnologico")[0].children ? document.querySelectorAll("#no-tecnologico")[0].children : []
    

    let categoriaNoTecnoLeft = []
    for (const b of categoriaNoTecno) {
        categoriaNoTecnoLeft.push(b.id)
    } 

    return {
        itemsLeft,
        categoriaTecnoLeft,
        categoriaNoTecnoLeft
    }
}

