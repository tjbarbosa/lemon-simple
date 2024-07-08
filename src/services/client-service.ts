import {
  ClientTypeInput,
  InvalidCheckEligibilityOutput,
  ValidCheckEligibilityOutput,
} from "../dto/client.dto";
import { EligibilityError } from "../middlewares/errorHandler";
import {
  ConnectionTypeEnum,
  MinConsumptionByConnectionTypeEnum,
  ValidConsumptionClassEnum,
  ValidTariffModalityEnum,
} from "../types/client.type";

export class ClientService {
  checkEligibility(
    clientType: ClientTypeInput
  ): InvalidCheckEligibilityOutput | ValidCheckEligibilityOutput {
    const {
      consumptionClass,
      tariffModality,
      connectionType,
      consumptionHistory,
    } = clientType;

    const validConsumptionClass: string[] = Object.values(
      ValidConsumptionClassEnum
    );
    if (!validConsumptionClass.includes(consumptionClass.toLowerCase())) {
      EligibilityError;
      return {
        eligible: false,
        reason: EligibilityError.INELIGIBLE_CONSUMPTION_CLASS,
      };
    }

    const validTariffModality: string[] = Object.values(
      ValidTariffModalityEnum
    );
    if (!validTariffModality.includes(tariffModality.toLowerCase())) {
      return {
        eligible: false,
        reason: EligibilityError.INELIGIBLE_TARIFF_MODALITY,
      };
    }

    const baseNumberOfMonths = 12;

    if (consumptionHistory?.length < baseNumberOfMonths) {
      return {
        eligible: false,
        reason: EligibilityError.INSUFFICIENT_CONSUMPTION_HISTORY,
      };
    }

    const averageConsumption =
      consumptionHistory
        .slice(-baseNumberOfMonths)
        .reduce((accumulator, consumption) => accumulator + consumption, 0) /
      baseNumberOfMonths;

    if (
      (connectionType.toLowerCase() === ConnectionTypeEnum.singlePhase &&
        averageConsumption < MinConsumptionByConnectionTypeEnum.singlePhase) ||
      (connectionType.toLowerCase() === ConnectionTypeEnum.twoPhase &&
        averageConsumption < MinConsumptionByConnectionTypeEnum.twoPhase) ||
      (connectionType.toLowerCase() === ConnectionTypeEnum.threePhase &&
        averageConsumption < MinConsumptionByConnectionTypeEnum.threePhase)
    ) {
      return {
        eligible: false,
        reason: EligibilityError.LOW_AVERAGE_CONSUMPTION,
      };
    }

    const kWhGenerationReferenceBrazil = 1000;
    const averageCO2KgEmissionForKWhReferenceInBrazil = 84;

    const annualEconomyProjection =
      averageCO2KgEmissionForKWhReferenceInBrazil /
      kWhGenerationReferenceBrazil;

    const annualCO2Savings =
      averageConsumption * baseNumberOfMonths * annualEconomyProjection;

    return { eligible: true, annualCO2Savings };
  }
}
