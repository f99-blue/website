import { AllHTMLAttributes } from "react";

interface LoadingBlockProps extends AllHTMLAttributes<HTMLDivElement> {}

export function LoadingBlock(_props: LoadingBlockProps) {
  const { className, ...props } = _props;

  return (
    <div
      className={`h-40 bg-gray-700 flex items-center justify-center animate-pulse text-opacity-50 rounded ${className}`}
      {...props}
    >
      Loading...
    </div>
  );
}
