import { validarToken } from "../routes/usuarios.js";

export function verificarToken(req, res, next) {
  const autorizacao = req.headers.authorization;

  if (!autorizacao) {
    return res.status(401).json({
      mensagem: "Token não informado"
    });
  }

  const partes = autorizacao.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      mensagem: "Formato do token inválido"
    });
  }

  const token = partes[1];

  const usuarioId = validarToken(token);

  if (!usuarioId) {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado"
    });
  }

  req.usuarioId = usuarioId;

  next();
}