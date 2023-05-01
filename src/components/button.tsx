import { AllHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<AllHTMLAttributes<HTMLButtonElement>> {}

export function Button(_props: ButtonProps) {
  const { type, className, ...props } = _props;

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`px-3 py-4 text-center block bg-_red rounded w-full text-white ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
