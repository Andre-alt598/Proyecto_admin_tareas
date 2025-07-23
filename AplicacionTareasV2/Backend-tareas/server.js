const express = require("express");
const cors = require("cors");
const authRoutes = require("../Backend-tareas/routes/auth");
const tareasRoutes = require("../Backend-tareas/routes/tareas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
