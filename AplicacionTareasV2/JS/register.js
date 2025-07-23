document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-register").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || "Error al registrar");
      }

      alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      window.location.href = "../index.html";
    } catch (err) {
      document.getElementById("error-msg").textContent = err.message;
    }
  });
});
