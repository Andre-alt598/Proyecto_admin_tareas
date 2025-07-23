document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("save-task");
  const inputTitulo = document.getElementById("task-input");
  const inputDescripcion = document.getElementById("taskDescripcion");
  const selectEstado = document.getElementById("task-status");
  const taskList = document.getElementById("task-list");

  // Guardar nueva tarea
  btnGuardar.addEventListener("click", async () => {
    const nuevaTarea = {
      titulo: inputTitulo.value.trim(),
      descripcion: inputDescripcion.value.trim(),
      estado: selectEstado.value
    };

    if (!nuevaTarea.titulo) {
      alert("Debes ingresar un título.");
      return;
    }

    await fetch("/api/nueva-tarea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea)
    });

    inputTitulo.value = "";
    inputDescripcion.value = "";
    selectEstado.value = "En espera";

    cargarTareas();
    cargarGrafico();
  });

  // Cargar lista de tareas
  async function cargarTareas() {
    const res = await fetch("/api/tareas");
    const tareas = await res.json();
    taskList.innerHTML = "";

    tareas.forEach((tarea, index) => {
      const li = document.createElement("li");

      // Título y descripción
      const span = document.createElement("span");
      span.innerHTML = `<strong>${tarea.titulo}</strong><br>${tarea.descripcion}`;
      li.appendChild(span);

      // Select de estado editable
      const select = document.createElement("select");
      ["En espera", "En progreso", "Completada"].forEach(op => {
        const option = document.createElement("option");
        option.value = op;
        option.textContent = op;
        if (op === tarea.estado) option.selected = true;
        select.appendChild(option);
      });
      select.addEventListener("change", async () => {
        await fetch("/api/editar-tarea", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: index, nuevo_estado: select.value })
        });
        cargarGrafico();
      });
      li.appendChild(select);

      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.innerHTML = "🗑️";
      btnEliminar.title = "Eliminar";
      btnEliminar.addEventListener("click", async () => {
        await fetch(`/api/eliminar-tarea/${index}`, { method: "DELETE" });
        cargarTareas();
        cargarGrafico();
      });
      li.appendChild(btnEliminar);

      taskList.appendChild(li);
    });
  }

  // Gráfico de resumen
  async function cargarGrafico() {
    const res = await fetch("/api/resumen-tareas");
    const data = await res.json();
    const ctx = document.getElementById("task-chart").getContext("2d");

    if (window.taskChart) window.taskChart.destroy();

    window.taskChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["En espera", "En progreso", "Completada"],
        datasets: [{
          data: [data["En espera"], data["En progreso"], data["Completada"]],
          backgroundColor: ["#f39c12", "#3498db", "#2ecc71"]
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: "#fff",
            formatter: value => (value > 0 ? `${value} tareas` : "")
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  // Inicialización
  cargarTareas();
  cargarGrafico();
});
