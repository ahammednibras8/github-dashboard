import Card from "@/components/Card";
import ContributionChart from "@/components/ContributionChart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 lg:p-12 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
        <div className="lg:w-1/3">
          <Card />
        </div>
        <div className="lg:w-2/3">
          <ContributionChart />
        </div>
      </div>
    </main>
  );
}