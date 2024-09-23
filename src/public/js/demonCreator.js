//Encuentra el formulario por su ID
const form = document.getElementById('demonCreation');

//Agrega un controlador de eventos para el clic en el botón
form.addEventListener('submit', (event) => {
    // Prevenir que el formulario recargue la página
    event.preventDefault();

    // Crear un objeto FormData para recopilar los datos del formulario
    const formData = new FormData(form);

    // Realizar una solicitud POST a la ruta '/' con los datos del formulario
    fetch('/api/cathedral/post', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Aquí puedes manejar la respuesta del servidor
        console.log('Éxito:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});