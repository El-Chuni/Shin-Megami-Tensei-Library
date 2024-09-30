//Encuentra el formulario por su ID
const form = document.getElementById('demonCreation');

//Agrega un controlador de eventos para el clic en el botón
form.addEventListener('submit', (event) => {
    //Previene que el formulario recargue la página
    event.preventDefault();

    //Crea un objeto FormData para recopilar los datos del formulario
    const formData = new FormData(form);

    // Realizar una solicitud POST a la ruta '/' con los datos del formulario
    fetch('/api/cathedral/post', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        //Alerta de éxito
        alert('¡Demonio subido con éxito!');

        //Recarga la página
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al subir el demonio.');
    });
});