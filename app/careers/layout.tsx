// app/divisions/layout.tsx
import { Metadata } from "next";
import { ReactNode } from "react";
import Head from '@/app/head';

export const metadata: Metadata = {
  
  title: "Careers -  White Aluminium Enterprises", // Default title for divisions
  description: "",
};

export default function DivisionsLayout({ children }: { children: ReactNode }) {
  return <>{children}<Head /></>;
}
