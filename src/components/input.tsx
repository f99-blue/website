import { InputHTMLAttributes, PropsWithChildren } from "react";

interface InputProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {}

export default function Input(_props: InputProps) {
  const { className, ...props } = _props;

  return (
    <input
      className={`block w-full p-3 bg-zinc-100 rounded ${className}`}
      {...props}
    >
      {props.children}
    </input>
  );
}
