import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-100 dark:bg-black">
      <ThemeToggle />
    </div>
  );
}
