export interface IInputProps {
  title: string;
  name: string;
  register?: unknown;
  options?: unknown;
  required?: boolean;
  type?: "email" | "text" | "password";
  disabled?: boolean;
  showRequired?: boolean;
  watch?: unknown;
  children?: unknown;
  light?: boolean;
  control?: unknown;
  classExtend?: string;
}

export type TOption = {
  label: string;
  value: string;
};
export interface ISelectProps extends IInputProps {
  items: TOption[];
  defaultValue?: TOption[];
}
