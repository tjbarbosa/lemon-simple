const cpf = {
  type: "string",
  pattern: "^\\d{11}$",
};

const cnpj = {
  type: "string",
  pattern: "^\\d{14}$",
};

const clientSchema = {
  type: "object",
  properties: {
    numero_documento: { oneOf: [cpf, cnpj] },
    classe_consumo: {
      type: "string",
      enum: ["residencial", "industrial", "comercial", "rural", "poderPublico"],
    },
    modalidade_tarifaria: {
      type: "string",
      enum: ["azul", "branca", "verde", "convencional"],
    },
    tipo_conexao: {
      type: "string",
      enum: ["monofasico", "bifasico", "trifasico"],
    },
    historico_consumo: {
      type: "array",
      items: {
        type: "integer",
        minimum: 0,
        maximum: 9999,
      },
      minItems: 3,
      maxItems: 12,
    },
  },
  required: [
    "numero_documento",
    "classe_consumo",
    "modalidade_tarifaria",
    "tipo_conexao",
    "historico_consumo",
  ],
  additionalProperties: false,
};

export default clientSchema;
