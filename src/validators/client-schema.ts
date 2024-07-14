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
    numeroDoDocumento: { oneOf: [cpf, cnpj] },
    classeDeConsumo: {
      type: "string",
      enum: ["residencial", "industrial", "comercial", "rural", "poderPublico"],
    },
    modalidadeTarifaria: {
      type: "string",
      enum: ["azul", "branca", "verde", "convencional"],
    },
    tipoDeConexao: {
      type: "string",
      enum: ["monofasico", "bifasico", "trifasico"],
    },
    historicoDeConsumo: {
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
    "numeroDoDocumento",
    "classeDeConsumo",
    "modalidadeTarifaria",
    "tipoDeConexao",
    "historicoDeConsumo",
  ],
  additionalProperties: false,
};

export default clientSchema;
