"use client";

import { useEffect, useState } from "react";
import { getProgressHistory, getStatistics, SessionHistory, ProgressStatistics } from "@/services/progress";
import StatisticsCard from "@/components/progress/StatisticsCard";
import ProgressChart from "@/components/progress/ProgressChart";
import HistoryTable from "@/components/progress/HistoryTable";

export default function Home() {
  const [history, setHistory] = useState<SessionHistory[]>([]);
  const [statistics, setStatistics] = useState<ProgressStatistics>({
    totalInterviews: 0,
    averageScore: 0,
    highestScore: 0,
  });

  useEffect(() => {
    const data = getProgressHistory();
    setHistory(data);
    setStatistics(getStatistics(data));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Minimal Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            AI Interview Portal - Dashboard
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Monitor mock interview progress, historical scores, and overall metrics.
          </p>
        </div>

        {/* Statistics KPI Grid */}
        <StatisticsCard statistics={statistics} />

        {/* Score Improvement Chart */}
        <ProgressChart history={history} />

        {/* History Table */}
        <HistoryTable history={history} />
      </div>
    </div>
  );
}
