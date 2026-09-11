import type { ReactNode } from "react";
import type { Control, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface IInputProps {
  title: string;
  name: string;
  register?: UseFormRegister<Record<string, unknown>>;
  options?: Record<string, unknown>;
  required?: boolean;
  type?: "email" | "text" | "password";
  disabled?: boolean;
  showRequired?: boolean;
  watch?: UseFormWatch<Record<string, unknown>>;
  children?: ReactNode;
  light?: boolean;
  control?: Control<Record<string, unknown>>;
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
