export type AlertVariant = "neutral" | "success" | "error" | "warning" | "info";
export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
}
