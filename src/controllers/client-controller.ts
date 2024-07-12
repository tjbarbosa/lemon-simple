import { Request, Response } from "express";
import { ClientService } from "../services/client-service";
import { ClientPresenter } from "../presenters/client-presenter";

const clientService = new ClientService();

export const checkEligibility = (req: Request, res: Response) => {
  const {
    classe_consumo: consumptionClass,
    modalidade_tarifaria: tariffModality,
    tipo_conexao: connectionType,
    historico_consumo: consumptionHistory,
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
    res.status(400).json(response);
  }
};
