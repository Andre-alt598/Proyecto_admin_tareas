from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'clave_super_segura'

# Ruta al archivo de tareas
TAREAS_FILE = 'tareas.json'

# Cargar tareas
def cargar_tareas():
    if os.path.exists(TAREAS_FILE):
        with open(TAREAS_FILE, 'r') as file:
            return json.load(file)
    return []

# Guardar tareas
def guardar_tareas(tareas):
    with open(TAREAS_FILE, 'w') as file:
        json.dump(tareas, file, indent=2)

# Usuarios simulados
usuarios = {
    "admin": "1234",
    "admins": "12345"
}

# ------------------ RUTAS FLASK ------------------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    usuario = request.form.get("usuario")
    contrasena = request.form.get("contrasena")

    if usuario in usuarios and usuarios[usuario] == contrasena:
        session["usuario"] = usuario
        return redirect(url_for("dashboard"))
    else:
        return render_template("index.html", error="Usuario o contraseña incorrectos.")

@app.route("/dashboard")
def dashboard():
    if "usuario" not in session:
        return redirect(url_for("index"))
    return render_template("dashboard.html", usuario=session["usuario"])

@app.route("/logout")
def logout():
    session.pop("usuario", None)
    return redirect(url_for("index"))

# ------------------ API TAREAS ------------------

@app.route("/api/tareas")
def api_tareas():
    return jsonify(cargar_tareas())

@app.route("/api/nueva-tarea", methods=["POST"])
def api_nueva_tarea():
    tareas = cargar_tareas()
    nueva = request.get_json()
    tareas.append(nueva)
    guardar_tareas(tareas)
    return jsonify({"mensaje": "Tarea agregada"}), 201

@app.route("/api/eliminar-tarea/<int:id>", methods=["DELETE"])
def api_eliminar_tarea(id):
    tareas = cargar_tareas()
    if 0 <= id < len(tareas):
        tareas.pop(id)
        guardar_tareas(tareas)
        return jsonify({"mensaje": "Tarea eliminada"}), 200
    return jsonify({"error": "Tarea no encontrada"}), 404

@app.route("/api/editar-tarea", methods=["PUT"])
def api_editar_tarea():
    data = request.get_json()
    tareas = cargar_tareas()

    id = data.get("id")
    nuevo_estado = data.get("nuevo_estado")

    if id is None or not (0 <= id < len(tareas)):
        return jsonify({"error": "ID inválido"}), 400

    tareas[id]["estado"] = nuevo_estado
    guardar_tareas(tareas)
    return jsonify({"mensaje": "Tarea actualizada"}), 200

@app.route("/api/resumen-tareas")
def api_resumen_tareas():
    tareas = cargar_tareas()
    resumen = {"En espera": 0, "En progreso": 0, "Completada": 0}

    for tarea in tareas:
        estado = tarea.get("estado", "En espera")
        if estado in resumen:
            resumen[estado] += 1

    return jsonify(resumen)

# ------------------ MAIN ------------------

if __name__ == "__main__":
    app.run(debug=True)
