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

        const { transporte } = db.servicios;
        console.log(transporte);

        // Funcion para mandar los arrglos correspondientes y el id de la seccion correspondiente
        domContent(transporte, '#servicios_card', 'Servicios de Transporte');

    } catch (error) {
        console.log(error)
    }
}

function domContent(array, seccion, name) {
    
    document.querySelector('#name_service').textContent = name;

    //Generar el HTML
    array.forEach( item => { 
        const { nombre, direccion, email, telefono, url } = item;
            
        //DOM Scripting
        const name = document.createElement('P');
        name.textContent = `${nombre}`;
        name.classList.add('nombre-patrimonio');
    
        const info = document.createElement('P');
        info.textContent = `Dirección: ${direccion}`;
        info.classList.add('info-patrimonio');

        const sitioWeb = document.createElement('P');
        sitioWeb.textContent = `Sitio Web: `;
        sitioWeb.classList.add('info-patrimonio');

        const sitioWebUrl = document.createElement('A');
        sitioWebUrl.textContent = url;
        sitioWebUrl.setAttribute('href', url);
        sitioWebUrl.setAttribute('target', '_blank');

        sitioWeb.appendChild(sitioWebUrl);

        const correosDiv = document.createElement('DIV');

        email.forEach( element => {
            const correo = document.createElement('P');
            correo.textContent = `Correo: ${element}`;
            correo.classList.add('info-patrimonio');
            correosDiv.appendChild(correo);
        })

        const telefonosDiv = document.createElement('DIV');

        telefono.forEach( element => {
            const telefono = document.createElement('P');
            telefono.textContent = `Teléfono: ${element}`;
            telefono.classList.add('info-patrimonio');
            telefonosDiv.appendChild(telefono);
        })
    
        const firstDiv = document.createElement('DIV');
        firstDiv.classList.add('patrimonio-info');
                
        const carta = document.createElement('DIV');
        carta.classList.add('patrimonio', 'card');
    
        const contenido = document.createElement('DIV');
    
        firstDiv.appendChild(name);
        firstDiv.appendChild(info);
        firstDiv.appendChild(correosDiv);
        firstDiv.appendChild(telefonosDiv);
        firstDiv.appendChild(sitioWeb);
        contenido.appendChild(firstDiv);
        carta.appendChild(contenido);
    
        //Inyectar en HTML
        document.querySelector(seccion).appendChild(carta);
    })
}