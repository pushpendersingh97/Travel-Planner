import Header from "@/components/Header";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <Search />
    </div>
  );
}
