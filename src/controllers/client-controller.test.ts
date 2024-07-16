import {Request, Response} from 'express';
import {checkEligibility} from '../controllers/client-controller';
import {ClientService} from '../services/client-service';
import {ClientPresenter} from '../presenters/client-presenter';
import {
  ValidConsumptionClassEnum,
  ValidTariffModalityEnum,
  ConnectionTypeEnum,
  InvalidConsumptionClassEnum,
  InvalidTariffModalityEnum,
} from '../types/client.type';

jest.mock('../services/client-service');
jest.mock('../presenters/client-presenter');

const mockCheckEligibility = ClientService.prototype.checkEligibility as jest.Mock;
const mockBindToPortuguese = ClientPresenter.bindToPortuguese as jest.Mock;

describe('Client Controller - checkEligibility', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 200 if eligible', () => {
    const serviceInput = {
      consumptionClass: ValidConsumptionClassEnum.commercial,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.twoPhase,
      consumptionHistory: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };

    const serviceOutput = {
      eligible: true,
      annualCO2Savings: 123,
    };

    const presenterOutput = {
      elegivel: true,
      economiaAnualDeCO2: 123,
    };

    mockCheckEligibility.mockReturnValue(serviceOutput);
    mockBindToPortuguese.mockReturnValue(presenterOutput);

    checkEligibility(req as Request, res as Response);

    expect(mockCheckEligibility).toHaveBeenCalledWith(serviceInput);
    expect(mockBindToPortuguese).toHaveBeenCalledWith(serviceOutput);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(presenterOutput);
  });

  it('should return 422 if not eligible', () => {
    req = {
      body: {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'poderPublico',
        modalidadeTarifaria: 'azul',
        historicoDeConsumo: [78, 60, 76, 97, 81, 31, 38, 92, 59, 60, 41, 97],
      },
    };

    const serviceInput = {
      consumptionClass: InvalidConsumptionClassEnum.publicPower,
      tariffModality: InvalidTariffModalityEnum.blue,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [78, 60, 76, 97, 81, 31, 38, 92, 59, 60, 41, 97],
    };

    const serviceOutput = {
      eligible: false,
      reasons: [
        'Classe de consumo não elegível',
        'Modalidade tarifária não elegível',
        'Histórico de consumo insuficiente',
        'Consumo médio abaixo do mínimo necessário',
      ],
    };

    const presenterOutput = {
      elegivel: false,
      razoesDeInelegibilidade: [
        'Classe de consumo não elegível',
        'Modalidade tarifária não elegível',
        'Histórico de consumo insuficiente',
        'Consumo médio abaixo do mínimo necessário',
      ],
    };

    mockCheckEligibility.mockReturnValue(serviceOutput);
    mockBindToPortuguese.mockReturnValue(presenterOutput);

    checkEligibility(req as Request, res as Response);

    expect(mockCheckEligibility).toHaveBeenCalledWith(serviceInput);
    expect(mockBindToPortuguese).toHaveBeenCalledWith(serviceOutput);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(presenterOutput);
  });
});
