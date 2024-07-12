import {
  CheckClientEligibilityTranslatedOutput,
  CheckEligibilityOutput
} from "../dto/client.dto";

export class ClientPresenter {
  static bindToPortuguese(
    checkEligibilityOutput: CheckEligibilityOutput
  ): CheckClientEligibilityTranslatedOutput {
    if ("reason" in checkEligibilityOutput) {
      return {
        elegivel: checkEligibilityOutput.eligible,
        razao: checkEligibilityOutput.reason,
      };
    }
    return {
      elegivel: checkEligibilityOutput.eligible,
      economia_anual_co2: checkEligibilityOutput.annualCO2Savings,
    };
  }
}
