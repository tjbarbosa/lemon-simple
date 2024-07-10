type Cpf = {
  type: "string";
  pattern: "^\\d{11}$";
};

type Cnpj = {
  type: "string";
  pattern: "^\\d{14}$";
};

export type IdentifierType = Cpf | Cnpj;

export enum ValidConsumptionClassEnum {
  "residential" = "residencial",
  "industrial" = "industrial",
  "commercial" = "comercial",
}

export enum InvalidConsumptionClassEnum {
  "rural" = "rural",
  "publicPower" = "poderPublico",
}

export type ConsumptionClassEnum =
  | ValidConsumptionClassEnum
  | InvalidConsumptionClassEnum;

export enum ValidTariffModalityEnum {
  "white" = "branca",
  "conventional" = "convencional",
}

export enum InvalidTariffModalityEnum {
  "blue" = "azul",
  "green" = "verde",
}

export type TariffModalityEnum =
  | ValidTariffModalityEnum
  | InvalidTariffModalityEnum;

export enum ConnectionTypeEnum {
  "singlePhase" = "monofasico",
  "twoPhase" = "bifasico",
  "threePhase" = "trifasico",
}

export enum MinConsumptionByConnectionTypeEnum {
  "singlePhase" = 400,
  "twoPhase" = 500,
  "threePhase" = 750,
}

export type ClientType = {
  documentNumber: IdentifierType;
  consumptionClass: ConsumptionClassEnum;
  tariffModality: TariffModalityEnum;
  connectionType: ConnectionTypeEnum;
  consumptionHistory: number[];
};
