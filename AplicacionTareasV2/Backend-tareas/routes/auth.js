const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);

  if (rows.length === 0) return res.status(401).json({ msg: "Usuario no encontrado" });

  const usuario = rows[0];
  const match = await bcrypt.compare(contrasena, usuario.contrasena);

  if (!match) return res.status(401).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, secret, { expiresIn: "1h" });
  res.json({ token, nombre: usuario.nombre });
});

router.post("/register", async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const hash = await bcrypt.hash(contrasena, 10);

  try {
    await pool.query("INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)", [nombre, correo, hash]);
    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(400).json({ msg: "Error al registrar usuario", error: err.message });
  }
});

module.exports = router;
