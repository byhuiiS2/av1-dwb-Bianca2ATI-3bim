import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

const router = express.Router();

const usuarios = [];
const tokens = new Map();

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Nome, email e senha são obrigatórios"
    });
  }

  const usuarioExistente = usuarios.find(
    (usuario) => usuario.email === email
  );

  if (usuarioExistente) {
    return res.status(409).json({
      mensagem: "Email já cadastrado"
    });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: senhaCriptografada
  };

  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: "Usuário cadastrado com sucesso",
    usuario: {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    }
  });
});

export async function fazerLogin(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Email e senha são obrigatórios"
    });
  }

  const usuario = usuarios.find(
    (usuario) => usuario.email === email
  );

  if (!usuario) {
    return res.status(401).json({
      mensagem: "Email ou senha inválidos"
    });
  }

  const senhaCorreta = await bcrypt.compare(
    senha,
    usuario.senha
  );

  if (!senhaCorreta) {
    return res.status(401).json({
      mensagem: "Email ou senha inválidos"
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  tokens.set(token, usuario.id);

  res.json({
    mensagem: "Login realizado com sucesso",
    token
  });
}

export function validarToken(token) {
  return tokens.get(token);
}

export default router;