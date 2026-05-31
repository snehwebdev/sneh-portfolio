import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface AdminButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AdminButton({
  children,
  className = "",
  ...props
}: AdminButtonProps) {
  return (
    <button
      {...props}
      className={`
        rounded-xl
        bg-cyan-500
        px-6
        py-3
        font-medium
        transition
        hover:scale-105
        hover:bg-cyan-400
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}