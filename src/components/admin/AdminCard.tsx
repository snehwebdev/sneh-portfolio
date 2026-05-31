import { ReactNode } from "react";

export default function AdminCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      {children}
    </div>
  );
}