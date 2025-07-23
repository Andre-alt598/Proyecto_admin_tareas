# 📋 Aplicación de Gestión de Tareas

Una aplicación web para crear, gestionar y visualizar tareas por usuario, desarrollada con:

- 🔧 **Frontend:** HTML, CSS y JavaScript
- 🚀 **Backend:** Node.js + Express
- 🗄️ **Base de datos:** MariaDB / MySQL
- 🔐 **Autenticación:** JSON Web Token (JWT)

---

## ✨ Características

- Registro e inicio de sesión con cifrado de contraseña (`bcrypt`)
- Creación, visualización, edición y eliminación de tareas
- Visualización gráfica de estado de tareas (Chart.js)
- Panel de usuario personalizado

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
git clone https://github.com/tu-usuario/AplicacionTareas.git
cd AplicacionTareas/backend

### 2. Instala dependencias del backend

npm install

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
Desde la carpeta backend/:

node server.js

Luego abre en tu navegador el archivo frontend/index.html o usa Live Server.

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
