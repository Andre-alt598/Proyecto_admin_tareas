// Manejo del formulario de inicio de sesión
document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Capturar datos del usuario
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    // Enviar credenciales al backend
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena })
    });

    if (!res.ok) throw new Error("Credenciales incorrectas");

    const data = await res.json();

    // Guardar el token y redirigir al dashboard
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre", data.nombre);

    window.location.href = "dashboard.html";
  } catch (err) {
    document.getElementById("error-msg").textContent = err.message;
  }
});


