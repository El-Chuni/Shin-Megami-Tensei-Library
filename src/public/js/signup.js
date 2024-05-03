document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmpassword"]').value;

    // Verificar si la contraseña y la confirmación de la contraseña son iguales
    if (password !== confirmPassword) {
        alert('La contraseña y la confirmación de la contraseña no coinciden.');
        return;
    }

    // Si las contraseñas coinciden, continuar con el registro del usuario
    const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    const data = await response.json();
    console.log(data); // Manejar la respuesta del servidor como desees
});
