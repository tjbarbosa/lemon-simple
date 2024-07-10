import { SuperTest, Test } from "supertest";
import { ClientService } from "../../src/services/client-service";
import { ClientTypeInput, ValidCheckEligibilityOutput, InvalidCheckEligibilityOutput } from "../../src/dto/client.dto";
import { EligibilityError } from "../../src/middlewares/errorHandler";
import { ConnectionTypeEnum, InvalidConsumptionClassEnum, InvalidTariffModalityEnum, MinConsumptionByConnectionTypeEnum, ValidConsumptionClassEnum, ValidTariffModalityEnum } from "../../src/types/client.type";

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(() => {
    clientService = new ClientService(); // Assuming you're creating the service instance directly
  });

  // ... (Define mock data for different test scenarios)

  // Eligible Client with Valid Data
  it('should return eligible client data with annual CO2 savings', async () => {
    // Mock client data
    const validClientData: ClientTypeInput = {
      consumptionClass: ValidConsumptionClassEnum.residential,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 90, 140, 180, 160, 120, 100, 80],
    };

    // Expected response structure
    const expectedResult: ValidCheckEligibilityOutput = {
      eligible: true,
      annualCO2Savings: expect.any(Number), // Expect a number but not validate the exact value
    };

    // Simulate the request to the service using SuperTest
    const response = await clientService.checkEligibility(validClientData);

    expect(response).toEqual(expectedResult);
  });

  // Ineligible Client - Invalid Consumption Class
  it('should return ineligible client due to invalid consumption class', async () => {
    // Mock client data with invalid consumption class
    const invalidClientData: ClientTypeInput = {
      consumptionClass: InvalidConsumptionClassEnum.publicPower,
      tariffModality: ValidTariffModalityEnum.conventional,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 90],
    };

    // Expected response structure
    const expectedResult: InvalidCheckEligibilityOutput = {
      eligible: false,
      reason: EligibilityError.INELIGIBLE_CONSUMPTION_CLASS,
    };

    // Simulate the request to the service using the service instance
    const response = await clientService.checkEligibility(invalidClientData);

    expect(response).toEqual(expectedResult);
  });

  // Ineligible Client - Invalid Tariff Modality
  it('should return ineligible client due to invalid tariff modality', async () => {
    // Mock client data with invalid tariff modality
    const invalidClientData: ClientTypeInput = {
      consumptionClass: ValidConsumptionClassEnum.commercial,
      tariffModality: InvalidTariffModalityEnum.blue,
      connectionType: ConnectionTypeEnum.singlePhase,
      consumptionHistory: [100, 120, 150, 130, 110, 90],
    };

    // Expected response structure
    const expectedResult: InvalidCheckEligibilityOutput = {
      eligible: false,
      reason: EligibilityError.INELIGIBLE_TARIFF_MODALITY,
    };

    // Simulate the request to the service using the service instance
    const response = await clientService.checkEligibility(invalidClientData);

    expect(response).toEqual(expectedResult);
  });

  // ... (Add similar tests for other scenarios)
});
