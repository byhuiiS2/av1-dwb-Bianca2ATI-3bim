import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Hello Kitty",
    description: "API REST para cadastro e gerenciamento de personagens da Hello Kitty",
    version: "1.0.0"
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
        summary: "Verifica se a API está funcionando",
        responses: {
          "200": {
            description: "API funcionando"
          }
        }
      }
    },
    "/usuarios": {
      post: {
        summary: "Cadastra um novo usuário",
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
        summary: "Realiza o login do usuário",
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
                },
                required: [
                  "email",
                  "senha"
                ]
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
        summary: "Lista todos os personagens",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Lista de personagens"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      },
      post: {
        summary: "Cadastra um novo personagem",
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
            description: "Dados obrigatórios não informados"
          },
          "401": {
            description: "Token inválido ou não informado"
          }
        }
      }
    },
    "/personagens/{id}": {
      get: {
        summary: "Busca um personagem pelo ID",
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
            }
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
        summary: "Atualiza um personagem",
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
            }
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
          "200": {
            description: "Personagem atualizado com sucesso"
          },
          "404": {
            description: "Personagem não encontrado"
          }
        }
      },
      delete: {
        summary: "Exclui um personagem",
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
            }
          }
        ],
        responses: {
          "200": {
            description: "Personagem excluído com sucesso"
          },
          "404": {
            description: "Personagem não encontrado"
          }
        }
      }
    },
    "/upload": {
      post: {
        summary: "Envia uma imagem",
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
                  imagem: {
                    type: "string",
                    format: "binary"
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Imagem enviada com sucesso"
          },
          "400": {
            description: "Imagem não enviada"
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