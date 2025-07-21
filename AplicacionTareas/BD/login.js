
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const errorMsg = document.getElementById("error-msg");
    errorMsg.textContent = ""; // Limpia mensaje anterior

    // Validaciones
    if (usuario === "" || contrasena === "") {
      errorMsg.textContent = "Por favor, completa todos los campos.";
      return;
    }

    if (usuario.length < 3) {
      errorMsg.textContent = "El usuario debe tener al menos 3 caracteres.";
      return;
    }

    if (contrasena.length < 4) {
      errorMsg.textContent = "La contraseña debe tener al menos 4 caracteres.";
      return;
    }

    // Validación simulada (puedes adaptar a base de datos real)
    if (usuario === "admins" && contrasena === "12345") {
      localStorage.setItem("usuario", usuario);
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
  });
});
