import { AllHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<AllHTMLAttributes<HTMLButtonElement>> {}

export function Button(_props: ButtonProps) {
  const { type, className, ...props } = _props;

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`px-6 py-3 text-center block bg-_red rounded ${
        className?.includes("w-") ? "" : "w-full"
      } outline-1 outline-none focus:outline-gray-500 ${
        className?.includes("text-") ? "" : "text-white"
      } ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
