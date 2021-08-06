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
                mostrarUbicacion(nombre, ubicacion.lat, ubicacion.lng);    
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

function mostrarUbicacion(titulo, lat, lng) {
    Swal.fire({
        title: titulo,                
        width: '90%',    
        html: `
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4298820964295!2d-96.13626968509729!3d19.17641748703041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c3414a4aa7477b%3A0x7a1d4e772ecbc23e!2sAv.%20Salvador%20D%C3%ADaz%20Mir%C3%B3n%201930%2C%20Moderno%2C%2091910%20Veracruz%2C%20Ver.!5e0!3m2!1ses-419!2smx!4v1628271689163!5m2!1ses-419!2smx" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        `    
    });
    console.log(lat, lng);
}
