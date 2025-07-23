document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const nombreUsuario = localStorage.getItem("nombre");

  if (!token || !nombreUsuario) {
    window.location.href = "index.html";
    return;
  }

  // Mostrar saludo con nombre
  const ahora = new Date();
  const hora = ahora.getHours();
  let saludo = "¡Hola";

  if (hora >= 5 && hora < 12) saludo = "¡Buenos días";
  else if (hora >= 12 && hora < 18) saludo = "¡Buenas tardes";
  else saludo = "¡Buenas noches";

  document.getElementById("saludo-usuario").textContent = `${saludo}, ${nombreUsuario}!`;

  const taskInput = document.getElementById("task-input");
  const taskDescripcion = document.getElementById("taskDescripcion");
  const taskStatus = document.getElementById("task-status");
  const saveButton = document.getElementById("save-task");
  const taskList = document.getElementById("task-list");

  const chartCtx = document.getElementById("task-chart").getContext("2d");
  let chart;

  function actualizarGrafico(tareas) {
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
        data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            datalabels: {
              formatter: (value, context) => {
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                return total === 0 ? "0%" : `${((value / total) * 100).toFixed(1)}%`;
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

  async function fetchTareas() {
    const res = await fetch("http://localhost:3000/api/tareas", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const tareas = await res.json();
    renderTareas(tareas);
  }

  function renderTareas(tareas) {
    taskList.innerHTML = "";

    tareas.forEach(tarea => {
      const li = document.createElement("li");
      const texto = document.createElement("span");
      texto.innerHTML = `<strong>${tarea.descripcion}</strong><br><small>${tarea.detalle || ""}</small>`;

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

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.addEventListener("click", async () => {
        await fetch(`http://localhost:3000/api/tareas/${tarea.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchTareas();
      });

      li.appendChild(texto);
      li.appendChild(select);
      li.appendChild(btnEliminar);
      taskList.appendChild(li);
    });

    actualizarGrafico(tareas);
  }

  saveButton.addEventListener("click", async () => {
    const descripcion = taskInput.value.trim();
    const detalle = taskDescripcion.value.trim();
    const estado = taskStatus.value;

    if (!descripcion) return alert("Escribe una tarea");

    await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ descripcion, detalle, estado })
    });

    taskInput.value = "";
    taskDescripcion.value = "";
    taskStatus.value = "En espera";
    fetchTareas();
  });

  document.querySelector(".logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    window.location.href = "index.html";
  });

  fetchTareas();
});

