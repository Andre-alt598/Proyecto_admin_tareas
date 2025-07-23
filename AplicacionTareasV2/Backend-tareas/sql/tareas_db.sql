-- Seleccionar base de datos
USE tareas_db;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL
);

-- Crear tabla de tareas
CREATE TABLE tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  detalle TEXT,
  estado ENUM('En espera', 'En progreso', 'Completada') DEFAULT 'En espera',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
tareas_db