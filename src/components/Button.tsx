import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  classExtend?: string;
}

const Button = ({ title, classExtend, ...rest }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`bg-gray-200 border hover:text-background text-gray-800  ${classExtend ?? ""}`}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
