import {CheckEligibilityInput, CheckEligibilityOutput} from '../dto/client.dto';
import {EligibilityError} from '../middlewares/errorHandler';
import {
  ConnectionTypeEnum,
  MinConsumptionByConnectionTypeEnum,
  ValidConsumptionClassEnum,
  ValidTariffModalityEnum,
} from '../types/client.type';

export class ClientService {
  checkEligibility(checkEligibilityInput: CheckEligibilityInput): CheckEligibilityOutput {
    const {consumptionClass, tariffModality, connectionType, consumptionHistory} = checkEligibilityInput;

    const reasons = [];

    const validConsumptionClass: string[] = Object.values(ValidConsumptionClassEnum);
    if (!validConsumptionClass.includes(consumptionClass.toLowerCase())) {
      reasons.push(EligibilityError.INELIGIBLE_CONSUMPTION_CLASS.toString());
    }

    const validTariffModality: string[] = Object.values(ValidTariffModalityEnum);
    if (!validTariffModality.includes(tariffModality.toLowerCase())) {
      reasons.push(EligibilityError.INELIGIBLE_TARIFF_MODALITY.toString());
    }

    const baseNumberOfMonths = 12;

    if (consumptionHistory?.length < baseNumberOfMonths) {
      reasons.push(EligibilityError.INSUFFICIENT_CONSUMPTION_HISTORY.toString());
    }

    const averageConsumption =
      consumptionHistory.slice(-baseNumberOfMonths).reduce((accumulator, consumption) => accumulator + consumption, 0) /
      baseNumberOfMonths;

    if (
      (connectionType.toLowerCase() === ConnectionTypeEnum.singlePhase &&
        averageConsumption < MinConsumptionByConnectionTypeEnum.singlePhase) ||
      (connectionType.toLowerCase() === ConnectionTypeEnum.twoPhase &&
        averageConsumption < MinConsumptionByConnectionTypeEnum.twoPhase) ||
      (connectionType.toLowerCase() === ConnectionTypeEnum.threePhase &&
        averageConsumption < MinConsumptionByConnectionTypeEnum.threePhase)
    ) {
      reasons.push(EligibilityError.LOW_AVERAGE_CONSUMPTION.toString());
    }

    if (reasons?.length) {
      return {
        eligible: false,
        reasons,
      };
    }

    const kWhGenerationReferenceBrazil = 1000;
    const averageCO2KgEmissionForKWhReferenceInBrazil = 84;

    const annualEconomyProjection = averageCO2KgEmissionForKWhReferenceInBrazil / kWhGenerationReferenceBrazil;

    const annualCO2Savings = averageConsumption * baseNumberOfMonths * annualEconomyProjection;

    return {eligible: true, annualCO2Savings};
  }
}
