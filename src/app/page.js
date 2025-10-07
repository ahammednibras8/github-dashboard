import Card from "@/components/Card";
import ContributionChart from "@/components/ContributionChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-start justify-start px-6 sm:px-8 lg:px-16 py-8 transition-colors duration-300">
      <Card />
      <ContributionChart />
    </main>
  );
}