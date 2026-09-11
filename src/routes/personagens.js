import express from "express";
import { verificarToken } from "../middlewares/auth.js";

const router = express.Router();

const personagens = [
  {
    id: 1,
    nome: "Hello Kitty",
    especie: "Gata",
    personalidade: "Amigável",
    cor: "Branco"
  },
  {
    id: 2,
    nome: "Mimmy",
    especie: "Gata",
    personalidade: "Tímida",
    cor: "Amarelo"
  },
  {
    id: 3,
    nome: "Kuromi",
    especie: "Coelha",
    personalidade: "Divertida",
    cor: "Preto"
  },
  {
    id: 4,
    nome: "My Melody",
    especie: "Coelha",
    personalidade: "Gentil",
    cor: "Rosa"
  },
  {
    id: 5,
    nome: "Cinnamoroll",
    especie: "Cachorro",
    personalidade: "Carinhoso",
    cor: "Branco"
  },
  {
    id: 6,
    nome: "Keroppi",
    especie: "Sapo",
    personalidade: "Alegre",
    cor: "Verde"
  },
  {
    id: 7,
    nome: "Pompompurin",
    especie: "Cachorro",
    personalidade: "Calmo",
    cor: "Amarelo"
  },
  {
    id: 8,
    nome: "Badtz-Maru",
    especie: "Pinguim",
    personalidade: "Travesso",
    cor: "Preto"
  },
  {
    id: 9,
    nome: "My Sweet Piano",
    especie: "Ovelha",
    personalidade: "Doce",
    cor: "Rosa"
  },
  {
    id: 10,
    nome: "Pochacco",
    especie: "Cachorro",
    personalidade: "Brincalhão",
    cor: "Branco"
  },
  {
    id: 11,
    nome: "Chococat",
    especie: "Gato",
    personalidade: "Curioso",
    cor: "Preto"
  },
  {
    id: 12,
    nome: "Tuxedosam",
    especie: "Pinguim",
    personalidade: "Elegante",
    cor: "Azul"
  },
  {
    id: 13,
    nome: "Gudetama",
    especie: "Ovo",
    personalidade: "Preguiçoso",
    cor: "Amarelo"
  },
  {
    id: 14,
    nome: "Kiki",
    especie: "Estrela",
    personalidade: "Aventureiro",
    cor: "Azul"
  },
  {
    id: 15,
    nome: "Lala",
    especie: "Estrela",
    personalidade: "Criativa",
    cor: "Rosa"
  },
  {
    id: 16,
    nome: "Hangyodon",
    especie: "Criatura marinha",
    personalidade: "Engraçado",
    cor: "Azul"
  },
  {
    id: 17,
    nome: "Pekkle",
    especie: "Pato",
    personalidade: "Divertido",
    cor: "Branco"
  },
  {
    id: 18,
    nome: "Dear Daniel",
    especie: "Gato",
    personalidade: "Gentil",
    cor: "Marrom"
  },
  {
    id: 19,
    nome: "Goropikadon",
    especie: "Monstro",
    personalidade: "Energético",
    cor: "Roxo"
  },
  {
    id: 20,
    nome: "Little Twin Stars",
    especie: "Estrelas",
    personalidade: "Sonhadores",
    cor: "Azul e Rosa"
  }
];

let proximoId = 21;

router.get("/", verificarToken, (req, res) => {
  res.json(personagens);
});

router.get("/:id", verificarToken, (req, res) => {
  const id = Number(req.params.id);

  const personagem = personagens.find(
    (personagem) => personagem.id === id
  );

  if (!personagem) {
    return res.status(404).json({
      mensagem: "Personagem não encontrado"
    });
  }

  res.json(personagem);
});

router.post("/", verificarToken, (req, res) => {
  const { nome, especie, personalidade, cor } = req.body;

  if (!nome || !especie || !personalidade || !cor) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios"
    });
  }

  const novoPersonagem = {
    id: proximoId,
    nome,
    especie,
    personalidade,
    cor
  };

  personagens.push(novoPersonagem);
  proximoId++;

  res.status(201).json({
    mensagem: "Personagem cadastrado com sucesso",
    personagem: novoPersonagem
  });
});

router.put("/:id", verificarToken, (req, res) => {
  const id = Number(req.params.id);

  const personagem = personagens.find(
    (personagem) => personagem.id === id
  );

  if (!personagem) {
    return res.status(404).json({
      mensagem: "Personagem não encontrado"
    });
  }

  const { nome, especie, personalidade, cor } = req.body;

  personagem.nome = nome ?? personagem.nome;
  personagem.especie = especie ?? personagem.especie;
  personagem.personalidade = personalidade ?? personagem.personalidade;
  personagem.cor = cor ?? personagem.cor;

  res.json({
    mensagem: "Personagem atualizado com sucesso",
    personagem
  });
});

router.delete("/:id", verificarToken, (req, res) => {
  const id = Number(req.params.id);

  const indice = personagens.findIndex(
    (personagem) => personagem.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Personagem não encontrado"
    });
  }

  personagens.splice(indice, 1);

  res.json({
    mensagem: "Personagem excluído com sucesso"
  });
});

export default router;