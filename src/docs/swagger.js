import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Hello Kitty",
    version: "1.0.0",
    description: "API REST para gerenciamento de personagens da Hello Kitty"
  },

  servers: [
    {
      url: "http://localhost:3000"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "Token"
      }
    },

    schemas: {
      Personagem: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          nome: {
            type: "string",
            example: "Hello Kitty"
          },
          especie: {
            type: "string",
            example: "Gata"
          },
          personalidade: {
            type: "string",
            example: "Amigável"
          },
          cor: {
            type: "string",
            example: "Branco"
          }
        }
      },

      Usuario: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            example: "Bianca"
          },
          email: {
            type: "string",
            example: "bianca@email.com"
          },
          senha: {
            type: "string",
            example: "123456"
          }
        }
      }
    }
  },

  paths: {
    "/": {
      get: {
        summary: "Verificar se a API está funcionando",
        responses: {
          "200": {
            description: "API funcionando"
          }
        }
      }
    },

    "/usuarios": {
      post: {
        summary: "Cadastrar usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Usuario"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuário cadastrado com sucesso"
          },
          "400": {
            description: "Dados obrigatórios não informados"
          },
          "409": {
            description: "Email já cadastrado"
          }
        }
      }
    },

    "/login": {
      post: {
        summary: "Realizar login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "bianca@email.com"
                  },
                  senha: {
                    type: "string",
                    example: "123456"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Login realizado com sucesso"
          },
          "401": {
            description: "Email ou senha inválidos"
          }
        }
      }
    },

    "/personagens": {
      get: {
        summary: "Listar personagens",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Lista de personagens",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Personagem"
                  }
                }
              }
            }
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      },

      post: {
        summary: "Cadastrar personagem",
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Personagem"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Personagem cadastrado com sucesso"
          },
          "400": {
            description: "Todos os campos são obrigatórios"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      }
    },

    "/personagens/{id}": {
      get: {
        summary: "Buscar personagem por ID",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        responses: {
          "200": {
            description: "Personagem encontrado"
          },
          "404": {
            description: "Personagem não encontrado"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      },

      put: {
        summary: "Atualizar personagem",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: {
                    type: "string",
                    example: "Hello Kitty"
                  },
                  especie: {
                    type: "string",
                    example: "Gata"
                  },
                  personalidade: {
                    type: "string",
                    example: "Muito amigável"
                  },
                  cor: {
                    type: "string",
                    example: "Branco"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Personagem atualizado com sucesso"
          },
          "404": {
            description: "Personagem não encontrado"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      },

      delete: {
        summary: "Excluir personagem",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        responses: {
          "200": {
            description: "Personagem excluído com sucesso"
          },
          "404": {
            description: "Personagem não encontrado"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      }
    },

    "/upload": {
      post: {
        summary: "Enviar imagem",
        description: "Aceita imagens JPG, JPEG ou PNG de até 2 MB.",
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  arquivo: {
                    type: "string",
                    format: "binary",
                    description: "Imagem JPG, JPEG ou PNG de até 2 MB"
                  }
                },
                required: [
                  "arquivo"
                ]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Arquivo enviado com sucesso"
          },
          "400": {
            description: "Arquivo não enviado"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      }
    }
  }
};

export function configurarSwagger(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
}