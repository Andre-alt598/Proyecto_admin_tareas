
document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuario = localStorage.getItem("usuario");

  // 🔒 Verifica que haya usuario logueado
  if (!nombreUsuario) {
    window.location.href = "index.html";
    return; // Detiene la ejecución si no hay usuario
  }

  // Mostrar saludo según la hora
  const ahora = new Date();
  const hora = ahora.getHours();
  let saludo;

  if (hora >= 5 && hora < 12) {
    saludo = "¡Buenos días";
  } else if (hora >= 12 && hora < 18) {
    saludo = "¡Buenas tardes";
  } else {
    saludo = "¡Buenas noches";
  }

  document.getElementById("saludo-usuario").textContent = `${saludo}, ${nombreUsuario}!`;

   // Referencias a elementos del DOM
  const taskInput = document.getElementById("task-input");
  const taskDescripcion = document.getElementById("taskDescripcion");
  const taskStatus = document.getElementById("task-status");
  const saveButton = document.getElementById("save-task");
  const taskList = document.getElementById("task-list");

  // Carga las tareas al iniciar  
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  const chartCtx = document.getElementById("task-chart").getContext("2d");
  let chart;

  // Guarda las tareas en localStorage
  function guardarEnLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  function actualizarGrafico() {
    const enEspera = tareas.filter(t => t.estado === "En espera").length;
    const enProgreso = tareas.filter(t => t.estado === "En progreso").length;
    const completadas = tareas.filter(t => t.estado === "Completada").length;

    const data = {
      labels: ["En espera", "En progreso", "Completada"],
      datasets: [{
        data: [enEspera, enProgreso, completadas],
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71"]
      }]
    };

    if (chart) {
      chart.data = data;
      chart.update();
    } else {
      chart = new Chart(chartCtx, {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            datalabels: {
              formatter: (value, context) => {
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                if (total === 0) return "0%";
                const porcentaje = ((value / total) * 100).toFixed(1);
                return `${porcentaje}%`;
              },
              color: '#fff',
              font: {
                weight: 'bold',
                size: 14
              }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    }
  }

  function renderTareas() {
    taskList.innerHTML = "";

    tareas.forEach((tarea, index) => {
      const li = document.createElement("li");
      const texto = document.createElement("span");
      texto.innerHTML = `<strong>${tarea.descripcion}</strong><br><small>${tarea.detalle || ""}</small>`;
      texto.style.marginRight = "10px";

      const select = document.createElement("select");
      ["En espera", "En progreso", "Completada"].forEach(estado => {
        const option = document.createElement("option");
        option.value = estado;
        option.textContent = estado;
        if (tarea.estado === estado) option.selected = true;
        select.appendChild(option);
      });

      select.addEventListener("change", () => {
        tareas[index].estado = select.value;
        guardarEnLocalStorage();
        actualizarGrafico();
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.style.marginLeft = "10px";
      btnEliminar.addEventListener("click", () => {
        tareas.splice(index, 1);
        guardarEnLocalStorage();
        renderTareas();
      });

      li.appendChild(texto);
      li.appendChild(select);
      li.appendChild(btnEliminar);
      taskList.appendChild(li);
    });

    actualizarGrafico();
  }

  saveButton.addEventListener("click", () => {
    const descripcion = taskInput.value.trim();
    const detalle = taskDescripcion.value.trim();
    const estado = taskStatus.value;

    if (descripcion === "") return alert("Escribe una tarea");

    tareas.push({ descripcion, detalle, estado });
    guardarEnLocalStorage();
    taskInput.value = "";
    taskDescripcion.value = "";
    taskStatus.value = "En espera";
    renderTareas();
  });

  // Botón "Cerrar sesión"
  document.querySelector(".logout-btn").addEventListener("click", () => {
    localStorage.removeItem("tareas");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
  });

  renderTareas();
});
