const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();
const secret = process.env.JWT_SECRET;

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token no enviado" });

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(403).json({ msg: "Token inválido" });
  }
}

// Obtener todas las tareas del usuario
router.get("/", verificarToken, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tareas WHERE usuario_id = ?", [req.user.id]);
  res.json(rows);
});

// Crear nueva tarea
router.post("/", verificarToken, async (req, res) => {
  const { descripcion, detalle, estado } = req.body;
  await pool.query("INSERT INTO tareas (usuario_id, descripcion, detalle, estado) VALUES (?, ?, ?, ?)", [
    req.user.id,
    descripcion,
    detalle,
    estado,
  ]);
  res.status(201).json({ msg: "Tarea creada correctamente" });
});

// Eliminar tarea
router.delete("/:id", verificarToken, async (req, res) => {
  await pool.query("DELETE FROM tareas WHERE id = ? AND usuario_id = ?", [req.params.id, req.user.id]);
  res.json({ msg: "Tarea eliminada" });
});

// Actualizar estado de tarea
router.put("/:id", verificarToken, async (req, res) => {
  const { estado } = req.body;
  await pool.query("UPDATE tareas SET estado = ? WHERE id = ? AND usuario_id = ?", [
    estado,
    req.params.id,
    req.user.id,
  ]);
  res.json({ msg: "Tarea actualizada" });
});

module.exports = router;
