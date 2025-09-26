import React from "react";

export default function Card({
  children,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      className={`rounded-xl bg-white shadow-sm border border-gray-100 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
