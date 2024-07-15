import { CheckEligibilityInput, CheckEligibilityOutput } from '../dto/client.dto';
import { EligibilityError } from '../middlewares/errorHandler';
import {
  ConnectionTypeEnum,
  InvalidConsumptionClassEnum,
  InvalidTariffModalityEnum,
  ValidConsumptionClassEnum,
  ValidTariffModalityEnum
} from '../types/client.type';
import { ClientService } from './client-service';

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(() => {
    clientService = new ClientService();
  });

  it('should return ineligible for invalid consumption class', () => {
    const input: CheckEligibilityInput = {
      consumptionClass: InvalidConsumptionClassEnum.publicPower,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 90, 140, 180, 160, 120, 100, 80],
    };

    const output: CheckEligibilityOutput = clientService.checkEligibility(input);

    expect(output).toEqual({
      eligible: false,
      reasons: [EligibilityError.INELIGIBLE_CONSUMPTION_CLASS],
    });
  });

  it('should return ineligible for invalid tariff modality', () => {
    const input: CheckEligibilityInput = {
      consumptionClass: ValidConsumptionClassEnum.residential,
      tariffModality: InvalidTariffModalityEnum.blue,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 90, 140, 180, 160, 120, 100, 80],
    };

    const output: CheckEligibilityOutput = clientService.checkEligibility(input);

    expect(output).toEqual({
      eligible: false,
      reasons: [EligibilityError.INELIGIBLE_TARIFF_MODALITY],
    });
  });

  it('should return ineligible for insufficient consumption history', () => {
    const input: CheckEligibilityInput = {
      consumptionClass: ValidConsumptionClassEnum.residential,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 160, 120, 100, 80],
    };

    const output: CheckEligibilityOutput = clientService.checkEligibility(input);

    expect(output).toEqual({
      eligible: false,
      reasons: [EligibilityError.INSUFFICIENT_CONSUMPTION_HISTORY],
    });
  });

  it('should return ineligible for low average consumption (single-phase)', () => {
    const input: CheckEligibilityInput = {
      consumptionClass: ValidConsumptionClassEnum.residential,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [10, 12, 15, 13, 11, 9, 14, 18, 16, 12, 10, 80],
    };

    const output: CheckEligibilityOutput = clientService.checkEligibility(input);

    expect(output).toEqual({
      eligible: false,
      reasons: [EligibilityError.LOW_AVERAGE_CONSUMPTION],
    });
  });

  it('should return eligible for valid input', () => {
    const input: CheckEligibilityInput = {
      consumptionClass: ValidConsumptionClassEnum.commercial,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.twoPhase,
      consumptionHistory: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };

    const output: CheckEligibilityOutput = clientService.checkEligibility(input);

    const annualCO2Savings = 5553.240000000001;

    expect(output).toEqual({
      eligible: true,
      annualCO2Savings,
    });
  });
});
