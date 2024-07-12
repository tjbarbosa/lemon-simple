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
  reason: string;
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
  razao: string;
};

export type EligibleClientTranslatedOutput = {
  elegivel: boolean;
  economia_anual_co2: number;
};

export type CheckClientEligibilityTranslatedOutput =
  | IneligibleClientTranslatedOutput
  | EligibleClientTranslatedOutput;
