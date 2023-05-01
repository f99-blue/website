import { PropsWithChildren } from "react";

type LoadingTextProps = PropsWithChildren<{
  isLoading: boolean;
}>;

export function LoadingText(props: LoadingTextProps) {
  return (
    <span
      className={`duration-300 transition-all ${
        props.isLoading ? "opacity-50" : "opactiy-100"
      }`}
    >
      {props.children ?? <span className="animate-pulse">???</span>}
    </span>
  );
}
