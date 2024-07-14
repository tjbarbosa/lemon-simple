import {
  CheckClientEligibilityTranslatedOutput,
  CheckEligibilityOutput
} from "../dto/client.dto";

export class ClientPresenter {
  static bindToPortuguese(
    checkEligibilityOutput: CheckEligibilityOutput
  ): CheckClientEligibilityTranslatedOutput {
    if ("reasons" in checkEligibilityOutput) {
      return {
        elegivel: checkEligibilityOutput.eligible,
        razoesDeInelegibilidade: checkEligibilityOutput.reasons,
      };
    }
    return {
      elegivel: checkEligibilityOutput.eligible,
      economiaAnualDeCO2: checkEligibilityOutput.annualCO2Savings,
    };
  }
}
