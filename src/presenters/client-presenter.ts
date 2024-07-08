import { InvalidCheckEligibilityOutput, ValidCheckEligibilityOutput, CheckEligibilityClientOutput } from "../dto/client.dto";

export class ClientPresenter {
  static bindToPortuguese(data: InvalidCheckEligibilityOutput | ValidCheckEligibilityOutput): CheckEligibilityClientOutput {
    return {
      elegivel: data.eligible,
      razao: '', // data?.reason || '',
      economia_anual_co2: 1234, // data?.annualCO2Savings,
    };
  }
}
