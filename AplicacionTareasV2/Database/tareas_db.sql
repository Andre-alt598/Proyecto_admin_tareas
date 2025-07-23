SELECT 
  u.nombre AS nombre_usuario,
  u.correo,
  t.descripcion,
  t.detalle,
  t.estado
FROM tareas t
JOIN usuarios u ON t.usuario_id = u.id;tareastareas