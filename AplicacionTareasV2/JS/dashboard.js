// Este script maneja la lógica del Dashboard

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const nombreUsuario = localStorage.getItem("nombre");

  // Redirige si no hay sesión activa
  if (!token || !nombreUsuario) {
    window.location.href = "index.html";
    return;
  }

   // Muestra saludo personalizado según hora
  const ahora = new Date();
  const hora = ahora.getHours();
  let saludo = "¡Hola";
  if (hora >= 5 && hora < 12) saludo = "¡Buenos días";
  else if (hora >= 12 && hora < 18) saludo = "¡Buenas tardes";
  else saludo = "¡Buenas noches";
  document.getElementById("saludo-usuario").textContent = `${saludo}, ${nombreUsuario}!`;

  // Referencias a elementos del DOM
  const taskInput = document.getElementById("task-input");
  const taskDescripcion = document.getElementById("taskDescripcion");
  const taskStatus = document.getElementById("task-status");
  const saveButton = document.getElementById("save-task");
  const taskList = document.getElementById("task-list");
  const suggestionList = document.getElementById("suggestion-list");

   // Llama a la API Flask para clasificar prioridad con IA
  async function obtenerPrioridad(descripcion, detalle) {
    try {
      const res = await fetch("http://localhost:5000/clasificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: descripcion + " " + detalle })
      });
      const data = await res.json();
      return data.prioridad || "Media";
    } catch (err) {
      console.error("Error al clasificar prioridad:", err);
      return "Media";
    }
  }

  // Genera gráfico de tareas usando chart
  let chart;
  function actualizarGrafico(tareas) {
    const estados = {};
    tareas.forEach(t => {
      estados[t.estado] = (estados[t.estado] || 0) + 1;
    });

    const labels = Object.keys(estados);
    const data = Object.values(estados);

    const config = {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          label: "Tareas por estado",
          data: data,
          backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: { position: "bottom" }
        }
      }
    };

    if (chart) chart.destroy();
    const ctx = document.getElementById("task-chart").getContext("2d");
    chart = new Chart(ctx, config);
  }

  // Obtiene tareas del backend
  async function fetchTareas() {
    const res = await fetch("http://localhost:3000/api/tareas", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const tareas = await res.json();
    renderTareas(tareas);
  }

  // Muestra las tareas en la lista del dashboard
  function renderTareas(tareas) {
    taskList.innerHTML = "";

    tareas.forEach(tarea => {
      const li = document.createElement("li");

      const texto = document.createElement("span");
      texto.innerHTML = `<strong>${tarea.descripcion}</strong><br><small>${tarea.detalle || ""}</small>`;

      const prioridad = document.createElement("span");
      prioridad.classList.add("prioridad-label");
      prioridad.textContent = tarea.prioridad ? ` ${tarea.prioridad}` : "";
      prioridad.style.marginLeft = "8px";
      
      // Colores visuales según prioridad
      if (tarea.prioridad === "Alta") prioridad.style.color = "#e74c3c";
      else if (tarea.prioridad === "Media") prioridad.style.color = "#f1c40f";
      else if (tarea.prioridad === "Baja") prioridad.style.color = "#2ecc71";

      // Selector para cambiar estado
      const select = document.createElement("select");
      ["En espera", "En progreso", "Completada"].forEach(estado => {
        const option = document.createElement("option");
        option.value = estado;
        option.textContent = estado;
        if (tarea.estado === estado) option.selected = true;
        select.appendChild(option);
      });

      select.addEventListener("change", async () => {
        await fetch(`http://localhost:3000/api/tareas/${tarea.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ estado: select.value })
        });
        fetchTareas();
      });

      // Botón eliminar con ícono
      const btnEliminar = document.createElement("button");
      btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
      btnEliminar.addEventListener("click", async () => {
        await fetch(`http://localhost:3000/api/tareas/${tarea.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchTareas();
      });

      texto.appendChild(prioridad);
      li.appendChild(texto);
      li.appendChild(select);
      li.appendChild(btnEliminar);
      taskList.appendChild(li);
    });

    actualizarGrafico(tareas);
    generarSugerencias(tareas);
  }

  // Guardar nueva tarea con clasificación IA incluida
  saveButton.addEventListener("click", async () => {
    const descripcion = taskInput.value.trim();
    const detalle = taskDescripcion.value.trim();
    const estado = taskStatus.value;

    if (!descripcion) return alert("Escribe una tarea");

    const prioridad = await obtenerPrioridad(descripcion, detalle);
    document.getElementById("mensaje-prioridad").textContent = "Prioridad sugerida: " + prioridad;

    await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ descripcion, detalle, estado, prioridad })
    });

    taskInput.value = "";
    taskDescripcion.value = "";
    taskStatus.value = "En espera";
    setTimeout(() => { document.getElementById("mensaje-prioridad").textContent = ""; }, 5000);
    fetchTareas();
  });

  // Botón de cierre de sesión
  document.querySelector(".logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    window.location.href = "index.html";
  });

  fetchTareas();// Carga inicial
});
