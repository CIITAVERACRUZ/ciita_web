document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarInformacion();
}

async function mostrarInformacion(){
    try {
        const url = './info.json';

        const resultado = await fetch(url);
        const db = await resultado.json();

        const { patrimonios, tradiciones, eventos, gastronomia } = db;

        // Funcion para mandar los arrglos correspondientes y el id de la seccion correspondiente
        domContent(patrimonios, '#patrimonios_card');
        domContent(tradiciones, '#tradiciones_card');
        domContent(gastronomia, '#gastronomia_card');

    } catch (error) {
        console.log(error)
    }
}

function domContent(array, seccion) {
    
    //Generar el HTML
    array.forEach( item => { 
        const { nombre, descripcion, imagen } = item;
            
        //DOM Scripting
        const name = document.createElement('P');
        name.textContent = nombre;
        name.classList.add('nombre-patrimonio');
    
        const info = document.createElement('P');
        info.innerHTML = descripcion;
        info.classList.add('info-patrimonio');
    
        const picture = document.createElement('IMG');
        picture.setAttribute('src', imagen)
    
        const firstDiv = document.createElement('DIV');
        firstDiv.classList.add('patrimonio-info');
                
        const carta = document.createElement('DIV');
        carta.classList.add('patrimonio', 'card');
    
        const contenido = document.createElement('DIV');
    
        firstDiv.appendChild(name);
        firstDiv.appendChild(info);
        contenido.appendChild(picture)
        contenido.appendChild(firstDiv)
        carta.appendChild(contenido);
    
        //Inyectar en HTML
        document.querySelector(seccion).appendChild(carta);
    })
}