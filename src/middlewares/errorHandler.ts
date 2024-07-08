import { Request, Response, NextFunction } from "express";

export enum EligibilityError {
  INTERNAL_SERVER_ERROR = "Ocorreu um erro interno.",
  INELIGIBLE_CONSUMPTION_CLASS = "Classe de consumo não elegível",
  INELIGIBLE_TARIFF_MODALITY = "Modalidade tarifária não elegível",
  INSUFFICIENT_CONSUMPTION_HISTORY = "Histórico de consumo insuficiente",
  LOW_AVERAGE_CONSUMPTION = "Consumo médio abaixo do mínimo necessário",
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Erro capturado globalmente:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: EligibilityError.INTERNAL_SERVER_ERROR });
}
