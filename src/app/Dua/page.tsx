import type { Metadata } from "next";
import Dua from "@/app/Dua/Dua";


export const metadata: Metadata = {
  title: "Dua",
  description: "Find the nearest masjid with our easy-to-use website",
};

export default function DuaPage() {
  return <Dua />;
}
