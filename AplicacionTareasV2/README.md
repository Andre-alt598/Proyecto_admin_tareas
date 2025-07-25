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
├── frontend
│ ├── CSS/
│ ├── IMG/
│ ├── JS/
│ ├── PY/
│ ├── dashboard.html
│ ├── index.html
│ └── register.html
├── .gitignore
└── README.md
---

## 🛠️ Instalación y configuración

## 🛠️ Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- MariaDB o MYSQL (https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.8.2&os=windows&cpu=x86_64&pkg=msi&mirror=insacom)
- Node.js (https://nodejs.org/en/download)
- Python (https://www.python.org/downloads/)

### 1. Clona el repositorio (opción 1)

🧱 ¿Qué necesitas antes de clonar?

   ✅ Tener instalado Git
   ✅ Tener el enlace del repositorio (- )

🛠️ 1. Instalar Git (si no lo tienes)
   🔗 Descarga Git:
   Sitio oficial: https://git-scm.com

Sigue los pasos de instalación según tu sistema operativo.

🧪 2. Verificar que Git está instalado

   Abre tu terminal o consola (cmd, PowerShell, Terminal) y escribe:
   git --version
   Si ves algo como git version 2.43.0, está correctamente instalado.

📦 3. Clonar un repositorio de GitHub

   🧷 Copia la URL del repositorio
   En la página del repositorio en GitHub:

   Haz clic en el botón verde "Code"

   Selecciona HTTPS

   💻 Copia el enlace en tu terminal, escribe:
   
   git clone https://github.com/Andre-alt598/Proyecto_admin_tareas.git
   
   el proyecto se encuentra en la carpeta: AplicacionTareasV2
   ignorar las demas ya que no estan actualizadas.

📂 4. Entrar a la carpeta del proyecto
   
   cd plicacionTareasFinal

   Ahora puedes abrir los archivos en un editor como VS Code:

   code .
 
  (O simplemente ábrelo manualmente desde el explorador de archivos).
  
✅ Resultado

   Ya tienes una copia local del proyecto y puedes:

   - Editarlo
   - Ejecutarlo (si es una app web, abre index.html)
   - Subir cambios (si tienes acceso al repositorio)
     
### 1. Descargar el proyecto (opción 2)

   Haz clic en Descargar ZIP (AplicacionTareasV2.zip).
   Extrae el contenido en una carpeta local.

### 2. Instala dependencias del backend

   Después de descomprimir, haz clic derecho dentro de la carpeta Backend-tareas(no sobre un archivo).
   Selecciona:
    🟢 “Abrir en Terminal” (en Windows 11)
    🟠 “Abrir ventana de PowerShell aquí”
    🔵 O “Abrir en Git Bash” (si tienes Git instalado)
   Escribe:
    npm install
    npm run dev
    pip install flask
    pip install flask scikit-learn
    npm install express
    npm install cors
    npm install dotenv
    npm install jsonwebtoken
    npm install bcrypt
    npm install jsonify
    npm install mysql2

### 3. Crea el archivo .env

   En backend/, crea un archivo .env con tu configuración de base de datos:

    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=tareas_db
    JWT_SECRET=clave_secreta


#### 4. Restaura la base de datos

   Desde HeidiSQL, MySQL Workbench o consola con esta consulta:

   - Crea la base de datos: tareas_db
   - Ejecuta el script: backend/sql/tareas_db.sql

### 5. inicia el servidor de node.js

   en la misma consola o terminal donde se instalaron las dependencias ( carpeta Backend-tareas) colocar:
     node server .js
   debe de aparecer el siguiente texto:
     Servidor escuchando en http://localhost:3000

#### 6. despliegue del programa

   Abre en tu navegador el archivo frontend/index.html o usa Live Server para su despliegue

    - registra un nuevo usuario
    - inicia sesion
    - diligencia los campos de titulo de tarea y su descripcion (opcional)
    - selecciona el estado de progreso
    - guarda la tarea
    - en la parte inferior del boton "guardar" aparecera la prioridad de la tarea
    - la grafica se actulizara automaticamente y al cerrar sesion se guardara localmente
  
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
