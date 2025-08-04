"use client";

import { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

// Placeholder wrapper — extendable for future themes
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}