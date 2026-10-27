import express from "express";
import personagensRoutes from "./src/routes/personagens.js";
import usuariosRoutes, { fazerLogin } from "./src/routes/usuarios.js";
import uploadRoutes from "./src/routes/upload.js";
import { configurarSwagger } from "./src/docs/swagger.js";

const app = express();
const PORT = 3000;

app.use(express.json());

configurarSwagger(app);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API da Hello Kitty funcionando!"
  });
});

app.use("/personagens", personagensRoutes);

app.use("/usuarios", usuariosRoutes);

app.post("/login", fazerLogin);

app.use("/upload", uploadRoutes);

try {

await prisma.$connect();
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
} catch (error) {
  console.error("Erro ao conectar ao banco de dados:", error);

  await prisma.$disconnect();

  process.exitCode = -1;
}
