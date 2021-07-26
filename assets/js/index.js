document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrar();
}

async function mostrar(){
    try {
        const url = './info.json';

        const resultado = await fetch(url);
        const db = await resultado.json();

        const { patrimonios } = db;
        console.log(db);

        //Generar el HTML
        patrimonios.forEach( patrimonio => { 
            const { nombre, descripcion, imagen } = patrimonio;
        
            //DOM Scripting
            const nombrePatrimonio = document.createElement('P');
            nombrePatrimonio.textContent = nombre;
            nombrePatrimonio.classList.add('nombre-patrimonio');

            const descripcionPatrimonio = document.createElement('P');
            descripcionPatrimonio.textContent = descripcion;
            descripcionPatrimonio.classList.add('info-patrimonio');

            const imagenPatrimonio = document.createElement('IMG');
            imagenPatrimonio.setAttribute('src', imagen)

            const patrimonioDiv = document.createElement('DIV');
            patrimonioDiv.classList.add('patrimonio-info');
            
            const patrimonioCard = document.createElement('DIV');
            patrimonioCard.classList.add('patrimonio', 'card');

            const patrimonioInfo = document.createElement('A');

            patrimonioDiv.appendChild(nombrePatrimonio);
            patrimonioDiv.appendChild(descripcionPatrimonio);
            patrimonioInfo.appendChild(imagenPatrimonio)
            patrimonioInfo.appendChild(patrimonioDiv)
            patrimonioCard.appendChild(patrimonioInfo);

            //Inyectar en HTML
            document.querySelector('#patrimonios_card').appendChild(patrimonioCard);
        })
    } catch (error) {
        console.log(error)
    }
}