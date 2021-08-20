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

function mostrarUbicacion() {
    const direccion = "Reforma 100, Centro, #93400 Papantla, Veracruz";
    let direccionUrl = direccion.replace(/ /g, "+").replace(/#/g, "");
    Swal.fire({
        title: 'H. Ayuntamiento de Papantla de Olarte Veracruz',                
        width: '90%',    
        html: `<iframe width="100%" height="500" style="border:0;" src="https://www.google.com/maps/embed/v1/place?q=${direccionUrl}&key=AIzaSyDlkR35laITqbWsuSKekD9Grpxz29iFUTc&center=20.4467558,-97.3226556&zoom=18"></iframe>`       
    });
}