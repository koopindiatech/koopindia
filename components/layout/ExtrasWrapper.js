"use client";
import { usePathname } from "next/navigation";
import FloatingContact from "@/components/FloatingComponent";

export default function ExtrasWrapper() {
  const pathname = usePathname();
  const noLayoutRoutes = ["/services"];
  const hideExtras = noLayoutRoutes.includes(pathname);

  if (hideExtras) return null;

  return <FloatingContact />;
}