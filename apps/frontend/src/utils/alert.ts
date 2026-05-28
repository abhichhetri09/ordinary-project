export type AlertVariant = "error" | "success" | "info";

export type AlertState = {
  message: string;
  variant: AlertVariant;
};

export function successAlert(message: string): AlertState {
  return { message, variant: "success" };
}

export function errorAlert(message: string): AlertState {
  return { message, variant: "error" };
}

export function infoAlert(message: string): AlertState {
  return { message, variant: "info" };
}

export function inferAlertVariant(message: string): AlertVariant {
  const m = message.toLowerCase();
  if (
    m.includes("success") ||
    m.includes("updated") ||
    m.includes("saved") ||
    m.includes("created")
  ) {
    return "success";
  }
  if (
    m.includes("fail") ||
    m.includes("error") ||
    m.includes("invalid") ||
    m.includes("could not")
  ) {
    return "error";
  }
  return "info";
}
