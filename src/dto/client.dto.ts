import { ClientType } from "../types/client.type";

export type ClientTypeInput = Pick<
  ClientType,
  | "consumptionClass"
  | "tariffModality"
  | "connectionType"
  | "consumptionHistory"
>;

export type InvalidCheckEligibilityOutput = {
  eligible: boolean;
  reason: string;
};

export type ValidCheckEligibilityOutput = {
  eligible: boolean;
  annualCO2Savings: number;
};

export type CheckEligibilityClientOutput = {
  elegivel?: boolean;
  razao?: string;
  economia_anual_co2?: number;
};
