import { AllHTMLAttributes, PropsWithChildren } from "react";

export interface AreaProps
  extends PropsWithChildren<AllHTMLAttributes<HTMLDivElement>> {}

export function Area(_props: AreaProps) {
  const { className, ...props } = _props;

  return (
    <div
      className={`bg-gray-800 p-6 block rounded shadow-sm ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
}
