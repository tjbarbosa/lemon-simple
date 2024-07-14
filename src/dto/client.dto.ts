import { CheckEligibilityType } from "../types/client.type";

export type CheckEligibilityInput = Pick<
  CheckEligibilityType,
  | "consumptionClass"
  | "tariffModality"
  | "connectionType"
  | "consumptionHistory"
>;

export type IneligibleClientOutput = {
  eligible: boolean;
  reasons: string[];
};

export type EligibleClientOutput = {
  eligible: boolean;
  annualCO2Savings: number;
};

export type CheckEligibilityOutput =
  | EligibleClientOutput
  | IneligibleClientOutput;

export type IneligibleClientTranslatedOutput = {
  elegivel: boolean;
  razoesDeInelegibilidade: string[];
};

export type EligibleClientTranslatedOutput = {
  elegivel: boolean;
  economiaAnualDeCO2: number;
};

export type CheckClientEligibilityTranslatedOutput =
  | IneligibleClientTranslatedOutput
  | EligibleClientTranslatedOutput;
