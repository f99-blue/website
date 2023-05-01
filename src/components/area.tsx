import { AllHTMLAttributes, PropsWithChildren } from "react";

interface AreaProps
  extends PropsWithChildren<AllHTMLAttributes<HTMLDivElement>> {}

export function Area(_props: AreaProps) {
  const { className, ...props } = _props;

  return (
    <div
      className={`bg-white p-6 block rounded border border-zinc-2oo shadow-sm ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
}
