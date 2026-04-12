export type PaywallValue = {
  kind: "text";
  value: string;
};

export type PaywallIconValue = {
  kind: "icon";
  value: "check" | "cross";
};

export type PaywallRowValue = PaywallValue | PaywallIconValue;

export interface PaywallRow {
  label: string;
  free: PaywallRowValue;
  pro: PaywallRowValue;
}

export const paywallRows: PaywallRow[] = [
  {
    label: "Flashcard sets per day",
    free: { kind: "text", value: "5 sets" },
    pro: { kind: "text", value: "Unlimited" },
  },
  {
    label: "Learn sessions / set / day",
    free: { kind: "text", value: "5 sessions" },
    pro: { kind: "text", value: "Unlimited" },
  },
  {
    label: "Test sessions / set / day",
    free: { kind: "text", value: "3 sessions" },
    pro: { kind: "text", value: "Unlimited" },
  },
  {
    label: "Terms per set",
    free: { kind: "text", value: "3 terms" },
    pro: { kind: "text", value: "Unlimited" },
  },
  {
    label: "Examples & type per term",
    free: { kind: "text", value: "3 terms" },
    pro: { kind: "text", value: "Unlimited" },
  },
  {
    label: "Premium UI",
    free: { kind: "icon", value: "check" },
    pro: { kind: "icon", value: "check" },
  },
  {
    label: "No ads",
    free: { kind: "icon", value: "check" },
    pro: { kind: "icon", value: "check" },
  },
  {
    label: "Priority support",
    free: { kind: "icon", value: "cross" },
    pro: { kind: "icon", value: "check" },
  },
  {
    label: "Early access to new features",
    free: { kind: "icon", value: "cross" },
    pro: { kind: "icon", value: "check" },
  },
];
