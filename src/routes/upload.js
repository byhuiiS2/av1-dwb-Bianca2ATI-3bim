import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/", upload.single("arquivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Envie um arquivo no campo 'arquivo'." });
  }

  res.status(201).json({ mensagem: "Arquivo enviado com sucesso", arquivo: req.file });
});

export default router;
