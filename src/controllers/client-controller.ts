import { Request, Response } from "express";
import { ClientService } from "../services/client-service";
import { ClientPresenter } from "../presenters/client-presenter";

const clientService = new ClientService();

export const checkEligibility = (req: Request, res: Response) => {
  const {
    classeDeConsumo: consumptionClass,
    modalidadeTarifaria: tariffModality,
    tipoDeConexao: connectionType,
    historicoDeConsumo: consumptionHistory,
  } = req.body;

  const checkEligibilityInput = {
    consumptionClass,
    tariffModality,
    connectionType,
    consumptionHistory,
  };

  const result = clientService.checkEligibility(checkEligibilityInput);
  const response = ClientPresenter.bindToPortuguese(result);

  if (response.elegivel) {
    res.status(200).json(response);
  } else {
    res.status(422).json(response);
  }
};
