import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const armazenamento = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + path.extname(file.originalname);
    cb(null, nomeArquivo);
  }
});

const upload = multer({
  storage: armazenamento,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens JPG, JPEG e PNG são permitidas."));
    }
  }
});

router.post("/", upload.single("arquivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      erro: "Envie um arquivo no campo 'arquivo'."
    });
  }

  res.status(201).json({
    mensagem: "Arquivo enviado com sucesso",
    arquivo: req.file
  });
});

export default router;