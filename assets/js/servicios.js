document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring)
    const tipo = params.get('tipo');

    if(!tipo)
        window.location = "/";
    mostrarInformacion(tipo);
}

async function mostrarInformacion(tipo){
    try {
        const url = './info.json';

        const resultado = await fetch(url);
        const db = await resultado.json();

        const infoServicio = eval(`db.servicios.${tipo}`);
        console.log(infoServicio)
        // Funcion para mandar los arrglos correspondientes y el id de la seccion correspondiente
        domContent(infoServicio, '#servicios_card', tipo.toUpperCase());

    } catch (error) {
        console.log(error)
    }
}

function domContent(array, seccion, name) {
    
    document.querySelector('#name_service').innerHTML = name;

    //Generar el HTML
    array.forEach( item => { 
        const { nombre, direccion, email, telefono, ubicacion, url } = item;
            
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

        const btnMapa = document.createElement('button');
        btnMapa.setAttribute('class', 'waves-effect waves-light btn center-align');
        btnMapa.setAttribute('style', 'width: 100%');
        btnMapa.textContent = 'Ubicación';
        btnMapa.addEventListener('click', () => {
            try {
                mostrarUbicacion(nombre, ubicacion.lat, ubicacion.lng, direccion);    
            } catch (error) {
                Swal.fire('Sin coordenadas')   
            }
        });
    
        firstDiv.appendChild(name);
        firstDiv.appendChild(info)        
        firstDiv.appendChild(correosDiv);
        firstDiv.appendChild(telefonosDiv);
        firstDiv.appendChild(sitioWeb);
        firstDiv.appendChild(btnMapa);
        contenido.appendChild(firstDiv);
        carta.appendChild(contenido);
    
        //Inyectar en HTML
        document.querySelector(seccion).appendChild(carta);
    })
}

function mostrarUbicacion(titulo, lat, lng, direccion) {
    let direccionUrl = direccion.replace(/ /g, "+").replace(/#/g, "")
    console.log(direccionUrl);
    Swal.fire({
        title: titulo,                
        width: '90%',    
        html: `<iframe width="100%" height="500" style="border:0;" src="https://www.google.com/maps/embed/v1/place?q=${direccionUrl}&key=AIzaSyDlkR35laITqbWsuSKekD9Grpxz29iFUTc&center=${lat},${lng}&zoom=18"></iframe>`    
    });
    console.log(lat, lng);
}
