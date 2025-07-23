# 🧠 Aplicación de Gestión de Tareas con IA

Aplicación web que permite a los usuarios registrar, visualizar y clasificar tareas usando una interfaz moderna, y una IA que sugiere automáticamente la prioridad de cada una.

---

## ✨ Características

- Registro e inicio de sesión con cifrado de contraseña (`bcrypt`)
- Creación, visualización, edición y eliminación de tareas
- Visualización gráfica de estado de tareas (Chart.js)
- Panel de usuario personalizado
- Responsive adaptable a todos los dispositivos

---

## 🚀 Tecnologías utilizadas

> Se usa una combinación de tecnologías de frontend, backend e inteligencia artificial:

- **Frontend**: HTML5, CSS3, JavaScript puro
- **Backend**: Node.js con Express para API REST
- **IA**: Flask (Python) + Scikit-learn (clasificación de prioridad)
- **Base de datos**: MariaDB
- **Gráficos**: Chart.js

---

## 📦 Estructura del proyecto

AplicacionTareas/
├── backend-tareas/
│ ├── routes/
│ ├── sql/
│ ├── .env 🔒 variables privadas
│ ├── db.js 🔌 conexión a MariaDB
│ ├── server.js 🚀 servidor Express
│ │ └── tareas_db.sql 🗄 script para crear la base de datos
├── frontend/
│ ├── CSS/
│ ├── JS/
│ ├── dashboard.html
│ ├── index.html
│ └── register.html
├── .gitignore
└── README.md
---

## 🛠️ Instalación y configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/Andre-alt598/Proyecto_admin_tareas.git
cd AplicacionTareas/backend

### 2. Instala dependencias del backend

npm install

### 🔹 Node.js Backend
```bash
npm install
npm run dev
```
### 🔹 Flask (Servidor IA)
```bash
pip install flask scikit-learn
python app.py
```

### 3. Crea el archivo .env

En backend/, crea un archivo .env con tu configuración de base de datos:

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=tareas_db
JWT_SECRET=tu_clave_secreta

4. Restaura la base de datos
Desde HeidiSQL, MySQL Workbench o consola:

- Crea la base de datos: tareas_db
- Ejecuta el script: backend/sql/tareas_db.sql

▶️ Ejecutar la aplicación
Desde la carpeta backend-tareas/:

node server.js

Luego abre en tu navegador el archivo frontend/index.html o usa Live Server.
---

## ✅ Funcionalidades principales

- ✔ Registro e inicio de sesión con autenticación por token
- ✔ Crear, editar y eliminar tareas
- ✔ Clasificación automática de prioridad con modelo IA (Flask)
- ✔ Visualización de tareas en gráfico de pastel
- ✔ Sugerencias inteligentes de tareas importantes

---

## 💡 Recomendaciones

- Agrega validación en el frontend para campos vacíos
- Elimina tareas completadas con botón visible
- Usa un `.env` para tus credenciales y puertos

---

📌 Notas

- El archivo .env está ignorado por Git por seguridad (.gitignore).
- Puedes crear más usuarios usando el formulario de registro.
- Cada usuario verá solo sus propias tareas.

📜 Licencia
Este proyecto es educativo y de libre uso. Puedes adaptarlo y extenderlo como desees.

💻 Autor

Desarrollado por:

Wilson Steven Cuesta Mora
Andrea Carolina Tapiero
Julieth Amanda Cisneros Guatibonza
Cesar Alirio Bernal Gomez

2025
