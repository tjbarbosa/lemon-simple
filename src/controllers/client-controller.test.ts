import {Request, Response} from 'express';
import {checkEligibility} from '../controllers/client-controller';
import {ClientService} from '../services/client-service';
import {ClientPresenter} from '../presenters/client-presenter';
import { ValidConsumptionClassEnum, ValidTariffModalityEnum, ConnectionTypeEnum } from '../types/client.type';

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
    const input = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };

    const inputService = {
      consumptionClass: ValidConsumptionClassEnum.commercial,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.twoPhase,
      consumptionHistory: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };



    const mockResult = {
      elegivel: true,
      economiaAnualDeCO2: 123,
    };
    mockCheckEligibility.mockReturnValue({
      eligible: true,
      annualCO2Savings: 123,
    });
    mockBindToPortuguese.mockReturnValue(mockResult);

    checkEligibility(req as Request, res as Response);

    expect(mockCheckEligibility).toHaveBeenCalledWith(inputService);
    expect(mockBindToPortuguese).toHaveBeenCalledWith(inputService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it('should return 422 if not eligible', () => {
    const mockResult = {elegivel: false};
    mockCheckEligibility.mockReturnValue(mockResult);
    mockBindToPortuguese.mockReturnValue(mockResult);

    checkEligibility(req as Request, res as Response);

    expect(mockCheckEligibility).toHaveBeenCalledWith(req.body);
    expect(mockBindToPortuguese).toHaveBeenCalledWith(mockResult);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });
});
