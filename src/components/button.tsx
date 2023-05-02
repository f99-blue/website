import { AllHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<AllHTMLAttributes<HTMLButtonElement>> {}

export function Button(_props: ButtonProps) {
  const { type, className, ...props } = _props;

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`px-5 py-3 text-center block bg-gray-300 rounded ${
        className?.includes("w-") ? "" : "w-full"
      } outline-1 outline-none focus:outline-gray-400 ${
        className?.includes("text-") ? "" : "text-black"
      } ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
