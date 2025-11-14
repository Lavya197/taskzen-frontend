"use client";

import * as React from "react";
import clsx from "clsx";

export default function Button({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
}) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
